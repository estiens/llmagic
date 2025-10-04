// Kessler Video Random Loader
// Loads a random video from the kessler/videos directory

document.addEventListener('DOMContentLoaded', function() {
  let videos = [];

  // Fetch video list from JSON file
  fetch('/assets/data/kessler-videos.json')
    .then(response => response.json())
    .then(data => {
      videos = data.videos;
      initializeVideoElements();
    })
    .catch(err => {
      console.error('Error loading Kessler videos:', err);
    });

  function initializeVideoElements() {
    if (videos.length === 0) return;

    // Find all video placeholders for Kessler
    const videoContainers = document.querySelectorAll('.kessler-video-container');

    videoContainers.forEach(container => {
      const randomVideo = videos[Math.floor(Math.random() * videos.length)];

      const video = document.createElement('video');
      video.src = randomVideo;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.className = 'kessler-video';
      video.style.width = '100%';
      video.style.height = 'auto';
      video.style.display = 'block';

      // Play on mouseover, pause on mouseout
      container.addEventListener('mouseenter', () => {
        video.play().catch(err => console.error('Video play error:', err));
      });

      container.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });

      container.appendChild(video);
    });
  }
});
