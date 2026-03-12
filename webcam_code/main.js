lucide.createIcons()

async function startCamera() {

  const video = document.getElementById("video")

  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user" },
    audio: false
  })

  video.srcObject = stream
  await video.play()
}

startCamera()


/* FIT TOGGLE */

const video = document.getElementById("video")
const fitButton = document.getElementById("fitToggle")

fitButton.onclick = () => {

    const currentFit = getComputedStyle(video).objectFit

  if (currentFit === "contain") {

    video.style.objectFit = "cover"
    fitButton.innerHTML = '<i data-lucide="minimize"></i>'

  } else {

    video.style.objectFit = "contain"
    fitButton.innerHTML = '<i data-lucide="maximize"></i>'

  }

  lucide.createIcons()
}


/* ZOOM */

let zoom = 1

const zoomButton = document.getElementById("zoomButton")
const zoomLabel = document.getElementById("zoomLabel")

function formatZoom(z) {

  if (Number.isInteger(z))
    return z + "x"

  return z.toFixed(1) + "x"

}

function applyZoom() {

  video.style.transform = `scaleX(-1) scale(${zoom})`
  zoomLabel.textContent = formatZoom(zoom)

}


/* SCROLL TO ZOOM */

zoomButton.addEventListener("wheel", (e) => {

  e.preventDefault()

  if (e.deltaY < 0)
    zoom += 0.1
  else
    zoom -= 0.1

  zoom = Math.min(Math.max(zoom, 1), 4)

  zoom = Math.round(zoom * 10) / 10

  applyZoom()

})


/* CLICK RESET */

zoomButton.onclick = () => {

  zoom = 1
  applyZoom()

}
