window.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('video');
  const fitButton = document.getElementById('fitToggle');
  const zoomButton = document.getElementById('zoomButton');
  const zoomLabel = document.getElementById('zoomLabel');
  const winMinimize = document.getElementById('winMinimize');
  const winMaximize = document.getElementById('winMaximize');
  const winClose = document.getElementById('winClose');

  if (!video || !fitButton || !zoomButton || !zoomLabel) {
    console.error('Required DOM elements not found.');
    return;
  }

  if (!winMinimize || !winMaximize || !winClose) {
    console.error('Window control elements not found.');
    return;
  }

  lucide.createIcons();

  /* WINDOW CONTROLS (frameless window) */
  function setMaximizeIcon(isMaximized) {
    winMaximize.innerHTML = isMaximized
      ? '<i data-lucide="copy"></i>'
      : '<i data-lucide="square"></i>';
    lucide.createIcons();
  }

  (async () => {
    if (window.windowControls?.isMaximized) {
      const isMax = await window.windowControls.isMaximized();
      setMaximizeIcon(isMax);
    }
  })();

  winMinimize.addEventListener('click', () => {
    window.windowControls?.minimize?.();
  });

  winClose.addEventListener('click', () => {
    window.windowControls?.close?.();
  });

  winMaximize.addEventListener('click', async () => {
    const isMax = await window.windowControls?.toggleMaximize?.();
    if (typeof isMax === 'boolean') {
      setMaximizeIcon(isMax);
    }
  });

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });

      video.srcObject = stream;
      await video.play();
    } catch (err) {
      console.error('Failed to start camera:', err);
      alert('Could not access your webcam. Please check permissions and try again.');
    }
  }

  startCamera();

  /* FIT TOGGLE */
  fitButton.addEventListener('click', () => {
    const currentFit = getComputedStyle(video).objectFit;

    if (currentFit === 'contain') {
      video.style.objectFit = 'cover';
      fitButton.innerHTML = '<i data-lucide="minimize"></i>';
    } else {
      video.style.objectFit = 'contain';
      fitButton.innerHTML = '<i data-lucide="maximize"></i>';
    }

    lucide.createIcons();
  });

  /* ZOOM */
  let zoom = 1;

  function formatZoom(z) {
    if (Number.isInteger(z)) {
      return `${z}x`;
    }

    return `${z.toFixed(1)}x`;
  }

  function applyZoom() {
    video.style.transform = `scaleX(-1) scale(${zoom})`;
    zoomLabel.textContent = formatZoom(zoom);
  }

  // Ensure initial label/transform are in sync
  applyZoom();

  /* SCROLL TO ZOOM */
  zoomButton.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();

      if (e.deltaY < 0) {
        zoom += 0.1;
      } else {
        zoom -= 0.1;
      }

      zoom = Math.min(Math.max(zoom, 1), 4);
      zoom = Math.round(zoom * 10) / 10;

      applyZoom();
    },
    { passive: false }
  );

  /* CLICK RESET */
  zoomButton.addEventListener('click', () => {
    zoom = 1;
    applyZoom();
  });
});
