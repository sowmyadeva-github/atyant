const whatsappNumber = "917286857290"

function openWhatsapp(message) {
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank")
}

document.addEventListener("click", e => {
  const direct = e.target.closest(".btn-whatsapp-direct")
  if (direct) {
    e.preventDefault()
    openWhatsapp("Hi, I want clarity regarding college and branch selection. Please guide me.")
    return
  }

  const offer = e.target.closest(".btn-offer-whatsapp")
  if (offer) {
    e.preventDefault()
    const plan = offer.dataset.plan
    const price = offer.dataset.price
    openWhatsapp(`Hi, I want to claim the ${plan} offer priced at ${price}. Please share complete details and payment process.`)
  }
})

const canvas = document.getElementById("bgCanvas")
const ctx = canvas.getContext("2d")

let dots = []

function resizeCanvas() {
  canvas.width = innerWidth
  canvas.height = innerHeight
  dots = []

  const count = Math.min(90, Math.floor((innerWidth * innerHeight) / 22000))

  for (let i = 0; i < count; i++) {
    dots.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.8 + 1
    })
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < dots.length; i++) {
    const d = dots[i]

    d.x += d.vx
    d.y += d.vy

    if (d.x < 0 || d.x > canvas.width) d.vx *= -1
    if (d.y < 0 || d.y > canvas.height) d.vy *= -1

    ctx.beginPath()
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(47,102,255,.22)"
    ctx.fill()

    for (let j = i + 1; j < dots.length; j++) {
      const d2 = dots[j]
      const dx = d.x - d2.x
      const dy = d.y - d2.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 110) {
        const op = (1 - dist / 110) * 0.08
        ctx.beginPath()
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(d2.x, d2.y)
        ctx.strokeStyle = `rgba(47,102,255,${op})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }
  }

  requestAnimationFrame(animate)
}

addEventListener("resize", resizeCanvas)

resizeCanvas()
animate()
