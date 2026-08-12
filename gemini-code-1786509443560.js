// 1. Playlist state and YouTube Video IDs
const playlist = [
  'dQw4w9WgXcQ', // Track 1
  '3JZ_D3ELwOQ', // Track 2
  'L_jWHffIx5E'  // Track 3
];

let currentIndex = 0;
let player = null;

// 2. Load the YouTube IFrame Player API asynchronously
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. API automatically triggers this global function when ready
function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    height: '0',
    width: '0',
    videoId: playlist[currentIndex],
    playerVars: {
      autoplay: 0,
      controls: 0,
      playsinline: 1
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

// 4. Called when the player is initialized and ready
function onPlayerReady(event) {
  updateTrackDisplay();
}

// 5. Handles player state changes (e.g., auto-play next track when ended)
function onPlayerStateChange(event) {
  // YT.PlayerState.ENDED === 0
  if (event.data === YT.PlayerState.ENDED) {
    nextTrack();
  }
}

// 6. Core control functions
function playTrack() {
  if (player && typeof player.playVideo === 'function') {
    player.playVideo();
  }
}

function pauseTrack() {
  if (player && typeof player.pauseVideo === 'function') {
    player.pauseVideo();
  }
}

function loadTrack(index) {
  if (index < 0 || index >= playlist.length) return;
  
  currentIndex = index;
  if (player && typeof player.loadVideoById === 'function') {
    player.loadVideoById(playlist[currentIndex]);
    updateTrackDisplay();
  }
}

function nextTrack() {
  const nextIndex = (currentIndex + 1) % playlist.length;
  loadTrack(nextIndex);
}

function prevTrack() {
  const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(prevIndex);
}

// 7. Helper to update UI
function updateTrackDisplay() {
  const display = document.getElementById('track-info');
  if (display) {
    display.textContent = `Playing Track ${currentIndex + 1} of ${playlist.length} (ID: ${playlist[currentIndex]})`;
  }
}