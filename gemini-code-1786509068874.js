// Sample playlist data mapped to time slots
const PLAYLISTS = {
  MORNING: ['Morning Raga', 'Chai & Strings', 'Sunrise Folk'],
  DAYTIME: ['Midday Acoustic', 'Deccan Blues', 'Workday Grooves'],
  EVENING: ['Sunset Honky-Tonk', 'Sitar & Steel', 'Twilight Lounge'],
  NIGHT: ['Late Night Ambient', 'Midnight Saloon', 'Velvet Strings']
};

/**
 * Gets the current hour in Indian Standard Time (IST)
 * @returns {number} Hour in 24-hour format (0–23)
 */
function getCurrentIstHour() {
  const now = new Date();
  
  // Convert current time to string using Asia/Kolkata timezone, then parse hour
  const istTimeStr = now.toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    hour12: false
  });

  return parseInt(istTimeStr, 10);
}

/**
 * Determines the active rotation based on IST hour and updates the DOM
 */
function updateRotationByIST() {
  const hour = getCurrentIstHour();
  let selectedPlaylist = [];
  let rotationName = '';

  // Determine slot: 05:00–09:00, 09:00–18:00, 18:00–22:00, 22:00–05:00
  if (hour >= 5 && hour < 9) {
    rotationName = 'Morning Express (05:00–09:00)';
    selectedPlaylist = PLAYLISTS.MORNING;
  } else if (hour >= 9 && hour < 18) {
    rotationName = 'Daytime Session (09:00–18:00)';
    selectedPlaylist = PLAYLISTS.DAYTIME;
  } else if (hour >= 18 && hour < 22) {
    rotationName = 'Evening Sundowner (18:00–22:00)';
    selectedPlaylist = PLAYLISTS.EVENING;
  } else {
    // Covers 22:00 to 04:59 (22, 23, 0, 1, 2, 3, 4)
    rotationName = 'Night Shift (22:00–05:00)';
    selectedPlaylist = PLAYLISTS.NIGHT;
  }

  // --- DOM Updates ---
  
  // 1. Update Rotation Name Heading/Label
  const rotationElement = document.getElementById('rotation-name');
  if (rotationElement) {
    rotationElement.textContent = rotationName;
  }

  // 2. Render Playlist Track Items into DOM
  const playlistContainer = document.getElementById('playlist-list');
  if (playlistContainer) {
    playlistContainer.innerHTML = selectedPlaylist
      .map(track => `<li>${track}</li>`)
      .join('');
  }

  return { rotationName, selectedPlaylist };
}

// Run immediately on page load
document.addEventListener('DOMContentLoaded', () => {
  updateRotationByIST();
  
  // Optional: Check and update every minute to transition smoothly across hour thresholds
  setInterval(updateRotationByIST, 60000);
});