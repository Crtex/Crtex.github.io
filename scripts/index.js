const video = document.getElementById('video');
const videoControls = document.getElementById('video-controls');
const playButton = document.getElementById('video-controls__play');
const overlay = document.getElementById('video-controls__overlay');
const playIcon = document.getElementById('playback-icon__play');
const pauseIcon = document.getElementById('playback-icon__pause');

const volumeButton = document.getElementById('video-controls__volume');
const volumeActiveIcon = document.getElementById('playback-icon__volume_active');
const volumeInactiveIcon = document.getElementById('playback-icon__volume_inactive');

const timeLabel = document.getElementById('video-controls__time');

let overlayTimeout;


// playback & volume controls
playButton.addEventListener('click', () => {
  video.paused ? video.play() : video.pause();
})

volumeButton.addEventListener('click', () => {
  video.muted = !video.muted;
  video.muted ? volumeButton.classList.add('inactive') : volumeButton.classList.remove('inactive');
  if (!this.video.paused) {
    video.muted ? setVolumeButtonActive(false) : setVolumeButtonActive(true);
  }
});

// video events
video.addEventListener('canplay', () => {
  playButton.classList.remove('hidden');
  timeLabel.classList.remove('hidden');
  volumeButton.classList.remove('hidden');
  overlay.classList.remove('hidden');
  hideOverlay();
})
video.addEventListener('play', () => {
  playIcon.classList.add('hidden');
  pauseIcon.classList.remove('hidden');
  if (!video.muted) {
    volumeInactiveIcon.classList.add('hidden');
    volumeActiveIcon.classList.remove('hidden');
  }
})
video.addEventListener('pause', () => {
  pauseIcon.classList.add('hidden');
  playIcon.classList.remove('hidden');
  volumeActiveIcon.classList.add('hidden');
  volumeInactiveIcon.classList.remove('hidden');
})
video.addEventListener('timeupdate', () => {
  const dateObj = new Date(video.currentTime * 1000).toISOString().slice(11, 19);
  timeLabel.innerText = `${dateObj.slice(3, 5)}:${dateObj.slice(6, 8)}`
});
video.addEventListener('mouseenter', () => {
  overlay.classList.remove('invisible');
})
video.addEventListener('mouseleave', () => {
  hideOverlay();
})

function hideOverlay() {
  if (overlayTimeout) {
    clearTimeout(overlayTimeout);
  }
  overlayTimeout = setTimeout(() => overlay.classList.add('invisible'), 3000);
}

function setVolumeButtonActive(active) {
  if (active) {
    volumeInactiveIcon.classList.add('hidden');
    volumeActiveIcon.classList.remove('hidden');
  } else {
    volumeActiveIcon.classList.add('hidden');
    volumeInactiveIcon.classList.remove('hidden');
  }
}


