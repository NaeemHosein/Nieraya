(function($) {
  $(document).ready(function() {

    var tracks = [
      {
        artist: "Clara La San",
        album: "Made Mistakes",
        song: '"In This Darkness"',
        audio: "Dark.mp3",
        albumArt: "Dark2.jpg",
        vinyl: "Dark2.jpg"
      },
      {
        artist: "Lord Huron",
        album: "Strange Trails",
        song: '"The Night We Met"',
        audio: "night.mp3",
        albumArt: "night2.jpg",
        vinyl: "night2.jpg"
      }
    ];

    var currentTrack = 0;
    var isPlaying = false;
    var audio = new Audio();
    audio.loop = true;

    function updateUI(index) {
      var t = tracks[index];
      $('.artist-name').text(t.artist);
      $('.album-title').text(t.album);
      $('.song-title').text(t.song);
      $('.album-art').css('background-image', "url('" + t.albumArt + "')");
      $('.vinyl').css('background-image', "url('" + t.vinyl + "'), url('" + t.albumArt + "')");
    }

    function loadTrack(index, autoplay) {
      var t = tracks[index];
      updateUI(index);
      audio.pause();
      audio.src = t.audio;
      audio.load();
      if (autoplay) {
        audio.play().then(function() {
          isPlaying = true;
          $('.music-player-container').addClass('is-playing');
        }).catch(function(e) {
          console.log('Playback error:', e);
          isPlaying = false;
          $('.music-player-container').removeClass('is-playing');
        });
      } else {
        isPlaying = false;
        $('.music-player-container').removeClass('is-playing');
      }
    }

    // Load first track on page load without playing
    loadTrack(0, false);

    // Play / Pause
    $('.control-play').on('click', function() {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
        $('.music-player-container').removeClass('is-playing');
      } else {
        audio.play().then(function() {
          isPlaying = true;
          $('.music-player-container').addClass('is-playing');
        }).catch(function(e) {
          console.log('Playback error:', e);
        });
      }
    });

    // Next track
    $('.control-forwards').on('click', function() {
      currentTrack = (currentTrack + 1) % tracks.length;
      loadTrack(currentTrack, isPlaying);
    });

    // Previous track
    $('.control-back').on('click', function() {
      currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
      loadTrack(currentTrack, isPlaying);
    });

  });
})(jQuery);