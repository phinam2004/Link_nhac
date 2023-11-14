window.addEventListener('DOMContentLoaded', function() {
    var movieContent = document.getElementById('movieContent');
    movieContent.classList.remove('hidden');
  
    var videoLinks = document.getElementsByClassName('video-link');
    var videoUrls = Array.from(videoLinks).map(function(link) {
      return link.getAttribute('href');
    });
  
    for (var i = 0; i < videoLinks.length; i++) {
      videoLinks[i].addEventListener('click', function(event) {
        event.preventDefault();
        var videoUrl = this.getAttribute('href');
        playVideo(videoUrl);
      });
    }
  
    function playVideo(url) {
      var currentIndex = videoUrls.indexOf(url);
  
      var videoContainer = document.createElement('div');
      videoContainer.innerHTML = `
        <video id="videoPlayer" controls autoplay>
          <source src="${url}" type="video/mp4">
        </video>
        <div class="controls">
          <button id="prevButton">Quay lại</button>
          <button id="nextButton">Video kế tiếp</button>
          <button id="homeButton">Trang chính</button>
        </div>
      `;
      movieContent.innerHTML = '';
      movieContent.appendChild(videoContainer);
  
      var videoPlayer = document.getElementById('videoPlayer');
      var prevButton = document.getElementById('prevButton');
      var nextButton = document.getElementById('nextButton');
      var homeButton = document.getElementById('homeButton');
  
      prevButton.addEventListener('click', function() {
        playPreviousVideo();
      });
  
      nextButton.addEventListener('click', function() {
        playNextVideo();
      });
  
      homeButton.addEventListener('click', function() {
        goHome();
      });
  
      function playPreviousVideo() {
        var previousIndex = (currentIndex - 1 + videoUrls.length) % videoUrls.length;
        var previousUrl = videoUrls[previousIndex];
        videoPlayer.src = previousUrl;
        videoPlayer.play();
        currentIndex = previousIndex;
      }
  
      function playNextVideo() {
        var nextIndex = (currentIndex + 1) % videoUrls.length;
        var nextUrl = videoUrls[nextIndex];
        videoPlayer.src = nextUrl;
        videoPlayer.play();
        currentIndex = nextIndex;
      }
  
      function goHome() {
        location.reload();
      }
    }
  });