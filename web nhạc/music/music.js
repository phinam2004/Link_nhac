var playlist = document.getElementById('playlist');
var audioPlayer = document.getElementById('audioPlayer');
var startSpeechRecognitionButton = document.getElementById('startSpeechRecognition');
var recognition;

playlist.addEventListener('click', function(event) {
  var target = event.target;
  if (target.tagName === 'LI') {
    var song = target.getAttribute('data-song');
    playSong(song);
  }
});

function playSong(song) {
  audioPlayer.src = song;
  audioPlayer.play();
}

function startSpeechRecognition() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
  recognition.lang = 'vi-VN';
  recognition.interimResults = false;
  recognition.continuous = true;

  recognition.onresult = function(event) {
    var transcript = event.results[event.results.length - 1][0].transcript;
    processSpeech(transcript);
  };

  recognition.start();
}

function processSpeech(transcript) {
  transcript = transcript.toLowerCase();

  var songs = playlist.getElementsByTagName('li');
  for (var i = 0; i < songs.length; i++) {
    var song = songs[i];
    var songName = song.innerText.toLowerCase();

    if (transcript.includes(songName)) {
      var songPath = song.getAttribute('data-song');
     playSong(songPath);
      break;
    }
  }
}

startSpeechRecognitionButton.addEventListener('click', function() {
  startSpeechRecognition();
});

// Kiểm tra xem người dùng có hỗ trợ API SpeechRecognition không
if (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition) {
  startSpeechRecognitionButton.style.display = 'inline-block';
} else {
  startSpeechRecognitionButton.style.display = 'none';
  console.log('Trình duyệt không hỗ trợ API SpeechRecognition.');
}