// ---------------- Keyboard event ----------------
document.body.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === 'f') {
    alert("Boo!");
  }
});

// ---------------- Number input ----------------
const input = document.getElementById('insert-input');
const button = document.getElementById('insert-btn');
const result = document.getElementById('result');

if (button && input && result) {
  button.addEventListener('click', () => {
    const num = input.value.trim();
    if (!num) {
      result.textContent = 'Please enter a number!';
      return;
    }

    result.textContent = "I'm thinking...";
    input.value = '';

    setTimeout(() => {
      result.textContent = `Your number was: ${num} ;)`;
    }, 3000);
  });
}

// ---------------- Mouse tracking ----------------
const mouse = { x: -100, y: -100 };
document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
document.addEventListener("mouseleave", () => {
  mouse.x = -100;
  mouse.y = -100;
});

// ---------------- Star animation ----------------
function createStar(container) {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.left = Math.random() * container.offsetWidth + "px";
  star.style.top = Math.random() * container.offsetHeight + "px";
  star.speed = 0.5 + Math.random() * 1.5;
  star.size = 1 + Math.random() * 2;
  star.style.width = star.size + "px";
  star.style.height = star.size + "px";
  star.opacity = 0.5 + Math.random() * 0.5;
  star.style.opacity = star.opacity;
  star.drift = (Math.random() - 0.5) * 0.5;
  container.appendChild(star);
  return star;
}

function animateStars(container) {
  const stars = [];
  const starCount = 50;
  for (let i = 0; i < starCount; i++) stars.push(createStar(container));

  let speedMultiplier = 1;
  let targetSpeed = 1;
  let scrollTimeout;

  window.addEventListener('wheel', () => {
    targetSpeed = 12;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => { targetSpeed = 1; }, 150);
  });

  function moveStars() {
    const rect = container.getBoundingClientRect();
    speedMultiplier += (targetSpeed - speedMultiplier) * 0.05;

    stars.forEach(star => {
      let x = parseFloat(star.style.left);
      let y = parseFloat(star.style.top);

      y += star.speed * speedMultiplier;
      x += star.drift * speedMultiplier;

      if (y > container.offsetHeight) { y = -star.size; x = Math.random() * container.offsetWidth; }
      if (x < 0) x = container.offsetWidth;
      if (x > container.offsetWidth) x = 0;

      const dx = mouse.x - rect.left - (x + star.size / 2);
      const dy = mouse.y - rect.top - (y + star.size / 2);
      const distance = Math.sqrt(dx*dx + dy*dy);
      const repelRadius = 80;
      if (distance < repelRadius) {
        const angle = Math.atan2(dy, dx);
        const force = (repelRadius - distance) / repelRadius * 5;
        x -= Math.cos(angle) * force;
        y -= Math.sin(angle) * force;
      }

      const twinkle = 0.005;
      star.opacity += (Math.random() - 0.5) * twinkle;
      star.opacity = Math.min(Math.max(star.opacity, 0.3), 1);
      star.style.opacity = star.opacity;

      star.style.left = x + "px";
      star.style.top = y + "px";
    });

    requestAnimationFrame(moveStars);
  }

  moveStars();
}

animateStars(document.getElementById("left-stars"));
animateStars(document.getElementById("right-stars"));

// ---------------- Shooting stars ----------------
function createShootingStar(container) {
  const star = document.createElement("div");
  star.classList.add("star");
  const startX = Math.random() * container.offsetWidth * 0.8;
  const startY = Math.random() * container.offsetHeight * 0.5;
  star.style.left = startX + "px";
  star.style.top = startY + "px";
  star.style.width = "2px";
  star.style.height = "2px";
  star.style.opacity = 1;
  container.appendChild(star);

  const vx = 8 + Math.random() * 4;
  const vy = 4 + Math.random() * 2;

  function move() {
    const x = parseFloat(star.style.left);
    const y = parseFloat(star.style.top);
    star.style.left = x + vx + "px";
    star.style.top = y + vy + "px";

    if (x > container.offsetWidth || y > container.offsetHeight) star.remove();
    else requestAnimationFrame(move);
  }

  move();
}

function shootingStarLoop() {
  const sides = [document.getElementById("left-stars"), document.getElementById("right-stars")];
  let frequency = 0.02;

  window.addEventListener('wheel', () => {
    frequency = 0.08;
    setTimeout(() => { frequency = 0.02; }, 200);
  });

  function loop() {
    if (Math.random() < frequency) {
      const container = sides[Math.floor(Math.random() * sides.length)];
      createShootingStar(container);
    }
    requestAnimationFrame(loop);
  }

  loop();
}

shootingStarLoop();

// ---------------- Theme toggle ----------------
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    if(document.body.classList.contains('light-theme')) localStorage.setItem('theme', 'light');
    else localStorage.setItem('theme', 'dark');
  });

  window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'light') document.body.classList.add('light-theme');
  });
}

// ---------------- Countdown ----------------
document.addEventListener("DOMContentLoaded", () => {
  const countdownText = document.getElementById("countdown-text");
  if (!countdownText) return;

  const graduationDate = new Date(2027, 5, 1);

  function updateCountdown() {
    const now = new Date();
    let totalSeconds = Math.floor((graduationDate - now) / 1000);

    if (totalSeconds <= 0) {
      countdownText.textContent = "🎉 Je bent afgestudeerd! Tijd om je dromen na te jagen!";
      return;
    }

    const years = Math.floor(totalSeconds / (365 * 24 * 60 * 60));
    totalSeconds -= years * 365 * 24 * 60 * 60;

    const months = Math.floor(totalSeconds / (30 * 24 * 60 * 60));
    totalSeconds -= months * 30 * 24 * 60 * 60;

    const weeks = Math.floor(totalSeconds / (7 * 24 * 60 * 60));
    totalSeconds -= weeks * 7 * 24 * 60 * 60;

    const days = Math.floor(totalSeconds / (24 * 60 * 60));

    countdownText.textContent = `${years} years, ${months} months, ${weeks} weeks, ${days} days till graduation!`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});

// ---------------- NASA APOD ----------------
const nasaApiKey = 'yEQgMEwLlSb2qYJGdtrWrdaGlz2LGMZRK9OoGgK5';

fetch(`https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`)
  .then(res => res.json())
  .then(data => {
    const nasaImage = document.getElementById('nasa-image');
    if (!nasaImage) return;

    if (data.media_type === "image" && data.url) {
      nasaImage.src = data.url;
      nasaImage.alt = data.title || "NASA Astronomy Picture of the Day";
    } else {
      nasaImage.src = "img/fallback.webp";
      nasaImage.alt = "NASA APOD is a video today. Showing fallback image.";
    }
  })
  .catch(err => {
    console.error("NASA API error:", err);
    const nasaImage = document.getElementById('nasa-image');
    if (nasaImage) {
      nasaImage.src = "img/fallback.webp";
      nasaImage.alt = "Could not load NASA APOD.";
    }
  });

// ---------------- Spotify via Lanyard ----------------
function updateSpotify() {
  fetch("https://api.lanyard.rest/v1/users/996477662866444368")
    .then(res => res.json())
    .then(data => {
      const spotify = data.data.spotify;
      const title = document.getElementById("spotify-title");
      const artist = document.getElementById("spotify-artist");
      const album = document.getElementById("spotify-album");
      const link = document.getElementById("spotify-link");

      if (spotify) {
        title.textContent = `${spotify.song}`;
        artist.textContent = `by ${spotify.artist}`;
        album.src = spotify.album_art_url;
        album.style.display = "block";
        link.href = spotify.track_id ? `https://open.spotify.com/track/${spotify.track_id}` : "#";
      } else {
        title.textContent = "Not playing anything...";
        artist.textContent = "";
        album.style.display = "none";
        link.href = "#";
      }
    })
    .catch(err => console.error("Spotify fetch error:", err));
}

setInterval(updateSpotify, 10000);
updateSpotify();
// ---------------- Galaxy Visualization ----------------
document.addEventListener("DOMContentLoaded", async () => {
  const galaxyContainer = document.getElementById("galaxy-container");
  if (!galaxyContainer) return;

  let currentPopup = null;

  function createGalaxyStar(item, x, y, size = 3, brightness = 0.8) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = x + "px";
    star.style.top = y + "px";
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.opacity = brightness;

    star.addEventListener("click", (e) => {
      if (currentPopup) currentPopup.remove();
      const popup = document.createElement("div");
      popup.classList.add("star-popup");
      popup.innerHTML = `<strong>${item.type.toUpperCase()}:</strong> ${item.name}<br>${item.details || ''}`;

      let popupX = x + 15;
      let popupY = y + 15;
      if (popupX + 200 > galaxyContainer.offsetWidth) popupX = x - 200;
      if (popupY + 60 > galaxyContainer.offsetHeight) popupY = y - 60;

      popup.style.left = popupX + "px";
      popup.style.top = popupY + "px";

      galaxyContainer.appendChild(popup);
      currentPopup = popup;
      e.stopPropagation();
    });

    galaxyContainer.appendChild(star);
    return star;
  }

  document.addEventListener("click", () => {
    if (currentPopup) { currentPopup.remove(); currentPopup = null; }
  });

  function generateSpiralPositions(count, arms = 3, spread = 0.5) {
    const positions = [];
    const centerX = galaxyContainer.offsetWidth / 2;
    const centerY = galaxyContainer.offsetHeight / 2;
    const maxRadius = Math.min(centerX, centerY);

    for (let i = 0; i < count; i++) {
      const arm = i % arms;
      const t = i / count;
      const angle = arm * (2 * Math.PI / arms) + t * 4 * Math.PI;
      const radius = t * maxRadius;
      const x = centerX + radius * Math.cos(angle) + (Math.random() - 0.5) * spread * maxRadius;
      const y = centerY + radius * Math.sin(angle) + (Math.random() - 0.5) * spread * maxRadius;
      const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      positions.push({ x, y, distance });
    }
    return positions;
  }

  async function loadStars() {
    galaxyContainer.querySelectorAll(".star, .star-popup").forEach(el => el.remove());

    const dbStars = await fetch("/.netlify/functions/fetch-stars")
      .then(r => r.json())
      .catch(() => []);

    const lanyardStars = await fetchLanyardData();

  
    const allStars = [...dbStars, ...lanyardStars];
    const starMap = {};
    allStars.forEach(s => {
      const key = s.type + "_" + s.name;
      if (!starMap[key]) starMap[key] = { ...s, count: s.count || 1 };
      else starMap[key].count += 1;
    });

    const positions = generateSpiralPositions(Object.keys(starMap).length, 3, 0.6);

  
    const activities = Object.values(starMap).filter(s => s.type === 'game');
    const spotify = Object.values(starMap).filter(s => s.type === 'spotify');

    const mostPlayedActivity = activities.length
      ? activities.reduce((a, b) => a.count > b.count ? a : b).name
      : "-";

    const mostListenedSong = spotify.length
      ? spotify.reduce((a, b) => a.count > b.count ? a : b).name
      : "-";

    // Update stats in HTML
    const mostPlayedEl = document.getElementById("most-played");
    const mostListenedEl = document.getElementById("most-listened");
    if (mostPlayedEl) mostPlayedEl.textContent = "Most Played Activity: " + mostPlayedActivity;
    if (mostListenedEl) mostListenedEl.textContent = "Most Listened Song: " + mostListenedSong;

    
    Object.values(starMap).forEach((star, idx) => {
      const pos = positions[idx];
      const size = 4 + star.count * 2; 
      const brightness = Math.max(0.3, 1 - pos.distance / Math.min(galaxyContainer.offsetWidth, galaxyContainer.offsetHeight));
      createGalaxyStar(star, pos.x, pos.y, size, brightness);

      
      saveStarToDB(star);
    });
  }

  async function fetchLanyardData() {
    try {
      const res = await fetch("https://api.lanyard.rest/v1/users/996477662866444368");
      const json = await res.json();
      const data = json.data;
      const stars = [];
      if (data.spotify) stars.push({
        type: "spotify",
        name: data.spotify.song,
        details: `Artist: ${data.spotify.artist}`,
        count: 1
      });
      if (data.activities) {
        data.activities.forEach(act => {
          if (act.type === 0) stars.push({
            type: "game",
            name: act.name,
            details: act.details || act.state || "",
            count: 1
          });
        });
      }
      return stars;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async function saveStarToDB(star) {
    try {
      await fetch("/.netlify/functions/save-star", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(star)
      });
    } catch (err) { console.error(err); }
  }

  await loadStars();
  setInterval(loadStars, 30000); 
});
