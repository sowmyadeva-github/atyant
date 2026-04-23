const steps = document.querySelectorAll(".form-step")
const nextBtn = document.getElementById("nextBtn")
const prevBtn = document.getElementById("prevBtn")
const submitBtn = document.getElementById("submitBtn")
const form = document.getElementById("multiStepForm")
const progressFill = document.getElementById("progressFill")
const progressText = document.getElementById("progressText")
const resultSection = document.getElementById("resultSection")

const previewTitle = document.getElementById("previewTitle")
const previewText = document.getElementById("previewText")
const previewPoints = document.getElementById("previewPoints")

const bestCollegeRange = document.getElementById("bestCollegeRange")
const bestBranchFit = document.getElementById("bestBranchFit")
const riskWarning = document.getElementById("riskWarning")
const suggestedNextStep = document.getElementById("suggestedNextStep")
const leadScore = document.getElementById("leadScore")
const recommendedProduct = document.getElementById("recommendedProduct")
const seniorMatch = document.getElementById("seniorMatch")
const whatsappPreview = document.getElementById("whatsappPreview")
const whatsappBtn = document.getElementById("whatsappBtn")

const segmentGrid = document.getElementById("segmentGrid")
const quizGrid = document.getElementById("quizGrid")
const quizResult = document.getElementById("quizResult")
const testimonialCard = document.getElementById("testimonialCard")

const whatsappNumber = "917286857290"

let currentStep = 1
let selectedSegment = "I know my rank"
let selectedQuizResult = ""

const testimonials = {
  "CSE / AI & Data Science": {
    text: "I was almost choosing a random college just for the name. After getting clarity on branch fit, I chose a better CSE path that suited my goals.",
    meta: "— JEE Student, CSE Aspirant"
  },
  "ECE / Electrical": {
    text: "I was confused between CSE and ECE, but the guidance helped me understand what matched my interests and future better.",
    meta: "— Student Story, ECE Path"
  },
  "Mechanical / Civil": {
    text: "I thought only top-name colleges mattered. The clarity process helped me compare branch reality, long-term fit, and regret risk.",
    meta: "— Engineering Student Story"
  },
  "Medical / NEET": {
    text: "I needed guidance that understood my marks, my options, and my stress. The advice felt personal, not generic.",
    meta: "— NEET Student Story"
  },
  "Commerce / Management": {
    text: "I was not clear about the right college direction for my goals. The personalized support helped me feel more confident.",
    meta: "— Commerce Student Story"
  },
  "Still Exploring / Not Sure": {
    text: "I didn’t even know what I wanted at first. The process helped me move from confusion to clarity step by step.",
    meta: "— Still Exploring Student"
  }
}

function showStep(step) {
  steps.forEach(s => s.classList.remove("active"))
  document.querySelector(`.form-step[data-step="${step}"]`).classList.add("active")

  const progressPercent = (step / steps.length) * 100
  progressFill.style.width = `${progressPercent}%`
  progressText.textContent = `Step ${step} of ${steps.length}`

  prevBtn.classList.toggle("hidden", step === 1)
  nextBtn.classList.toggle("hidden", step === steps.length)
  submitBtn.classList.toggle("hidden", step !== steps.length)
}

function validateStep(step) {
  const activeStep = document.querySelector(`.form-step[data-step="${step}"]`)
  const inputs = activeStep.querySelectorAll("input, select")

  for (const input of inputs) {
    if (!input.value.trim()) {
      input.focus()
      return false
    }
  }
  return true
}

function getFormData() {
  const data = new FormData(form)
  return Object.fromEntries(data.entries())
}

function parseRank(rankValue) {
  const cleaned = String(rankValue).replace(/[^\d]/g, "")
  return Number(cleaned) || 0
}

function getCollegeRange(examType, rank) {
  if (examType === "JEE") {
    if (rank <= 30000) return "You may target stronger college-brand options and better branch comparisons."
    if (rank <= 100000) return "Focus on realistic Tier 2 engineering colleges and branch-fit tradeoffs."
    return "Look for practical, value-based colleges with strong branch alignment and less regret risk."
  }

  if (examType === "NEET") {
    if (rank <= 50000) return "Focus on stronger medical-path options and realistic seat strategy."
    return "Look at budget, private/government tradeoffs, and realistic decision support."
  }

  return "Focus on colleges that fit your goals, affordability, and future direction instead of brand alone."
}

function getBranchFit(domain, priority) {
  if (priority === "Branch Interest") return `Your best fit currently leans toward ${domain}.`
  if (priority === "Placements") return `Choose a branch path in or near ${domain} only if it aligns with future opportunity and personal fit.`
  if (priority === "Fees / Affordability") return `Your best fit is a branch in ${domain} with safer fees-to-outcome balance.`
  return `Your likely fit is around ${domain}, but it should be validated with rank, location, and risk level.`
}

function getRiskWarning(confusion, priority) {
  if (confusion === "College vs Branch") {
    return "Do not choose only based on college name if branch mismatch will lead to long-term regret."
  }
  if (confusion === "CSE vs ECE") {
    return "Avoid following crowd pressure without checking your real interest and long-term comfort."
  }
  if (priority === "College Brand") {
    return "Brand without fit can look good now but feel wrong after one or two years."
  }
  return "A rushed decision without comparing fit, cost, and future path can increase regret."
}

function getSuggestedStep(segment, confusion) {
  if (segment === "I want to talk to a senior") {
    return "Talk to a senior first, then shortlist colleges and branches with more context."
  }
  if (confusion === "I don’t know what to choose") {
    return "Start with a guided clarity call and compare 3 safe options instead of overthinking everything."
  }
  return "Shortlist your best 3 options and validate them through a senior with a similar journey."
}

function getLeadScore(data) {
  const rank = parseRank(data.rank)
  let score = 0

  if (data.examType) score += 10
  if (data.domain) score += 10
  if (data.confusion) score += 10
  if (data.priority) score += 10
  if (data.state) score += 10
  if (selectedSegment) score += 10
  if (selectedQuizResult) score += 10

  if (rank > 0) score += 15
  if (data.confusion === "College vs Branch" || data.confusion === "CSE vs ECE") score += 10
  if (selectedSegment === "I want to talk to a senior") score += 5

  if (score >= 80) return "Premium Potential"
  if (score >= 65) return "High Intent"
  if (score >= 50) return "Confused but Valuable"
  return "Not Ready Yet"
}

function getRecommendedProduct(data, scoreLabel) {
  if (scoreLabel === "Premium Potential") return "Premium 1:1 — ₹999"
  if (data.confusion === "College vs Branch" || data.confusion === "CSE vs ECE") return "Decision Bundle — ₹249"
  if (data.priority === "Branch Interest") return "Better Branch — ₹149"
  return "Better College — ₹149"
}

function getSeniorMatch(data) {
  return `${data.examType} senior familiar with ${data.domain} decisions in ${data.state}, especially for students confused about ${data.confusion.toLowerCase()}.`
}

function buildWhatsappMessage(data, scoreLabel, product) {
  return `Hi, I am ${data.fullName} from ${data.state}. I am a ${data.examType} student with rank/percentile ${data.rank}. I am interested in ${data.domain}, confused about ${data.confusion}, and my top priority is ${data.priority}. My current segment is "${selectedSegment}" and my lead type looks like ${scoreLabel}. I want help with ${product}.`
}

function buildOfferWhatsappMessage(plan, price) {
  return `Hi, I want to claim the ${plan} offer priced at ${price}. Please share the complete details, payment process, and what is included in this offer.`
}

function openDirectWhatsapp(message) {
  const encodedMessage = encodeURIComponent(message)
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")
}

function updatePreview() {
  const data = getFormData()
  const domain = data.domain || "your preferred path"
  const priority = data.priority || "your priority"
  const confusion = data.confusion || "your current confusion"

  previewTitle.textContent = "A more personalized clarity path is being prepared"
  previewText.textContent = `We will use your domain interest, priority, and confusion type to suggest the right direction. Right now, your likely focus area is ${domain}, with more attention on ${priority.toLowerCase()} and solving ${confusion.toLowerCase()}.`

  previewPoints.innerHTML = `
    <div class="preview-pill">${selectedSegment}</div>
    <div class="preview-pill">${data.examType || "Exam type pending"}</div>
    <div class="preview-pill">${domain}</div>
    <div class="preview-pill">${priority}</div>
  `

  updateTestimonial(domain)
}

function updateTestimonial(domain) {
  const item = testimonials[domain] || testimonials["Still Exploring / Not Sure"]
  testimonialCard.innerHTML = `
    <p class="testimonial-text">“${item.text}”</p>
    <div class="testimonial-meta">${item.meta}</div>
  `
}

nextBtn.addEventListener("click", () => {
  if (!validateStep(currentStep)) return
  currentStep += 1
  showStep(currentStep)
  updatePreview()
})

prevBtn.addEventListener("click", () => {
  currentStep -= 1
  showStep(currentStep)
  updatePreview()
})

form.addEventListener("input", updatePreview)
form.addEventListener("change", updatePreview)

form.addEventListener("submit", e => {
  e.preventDefault()
  if (!validateStep(currentStep)) return

  const data = getFormData()
  const rankNumber = parseRank(data.rank)
  const scoreLabel = getLeadScore(data)
  const product = getRecommendedProduct(data, scoreLabel)
  const whatsappMessage = buildWhatsappMessage(data, scoreLabel, product)

  bestCollegeRange.textContent = getCollegeRange(data.examType, rankNumber)
  bestBranchFit.textContent = getBranchFit(data.domain, data.priority)
  riskWarning.textContent = getRiskWarning(data.confusion, data.priority)
  suggestedNextStep.textContent = getSuggestedStep(selectedSegment, data.confusion)
  leadScore.textContent = scoreLabel
  recommendedProduct.textContent = product
  seniorMatch.textContent = getSeniorMatch(data)
  whatsappPreview.textContent = whatsappMessage

  const encodedMessage = encodeURIComponent(whatsappMessage)
  whatsappBtn.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

  const leadRecord = {
    ...data,
    studentSegment: selectedSegment,
    quizResult: selectedQuizResult || "Not selected",
    leadScore: scoreLabel,
    recommendedProduct: product,
    timestamp: new Date().toISOString()
  }

  const leads = JSON.parse(localStorage.getItem("atyantLeads") || "[]")
  leads.push(leadRecord)
  localStorage.setItem("atyantLeads", JSON.stringify(leads))

  resultSection.classList.remove("hidden")
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" })
})

segmentGrid.addEventListener("click", e => {
  const card = e.target.closest(".segment-card")
  if (!card) return

  document.querySelectorAll(".segment-card").forEach(btn => btn.classList.remove("active"))
  card.classList.add("active")
  selectedSegment = card.dataset.segment
  updatePreview()
})

quizGrid.addEventListener("click", e => {
  const card = e.target.closest(".quiz-card")
  if (!card) return

  document.querySelectorAll(".quiz-card").forEach(btn => btn.classList.remove("active"))
  card.classList.add("active")
  selectedQuizResult = card.dataset.result
  quizResult.textContent = selectedQuizResult
})

document.addEventListener("click", e => {
  const directTrigger = e.target.closest(".btn-whatsapp-direct")
  if (directTrigger) {
    e.preventDefault()
    const defaultMessage = "Hi, I want clarity regarding college and branch selection. Please guide me."
    openDirectWhatsapp(defaultMessage)
    return
  }

  const offerTrigger = e.target.closest(".btn-offer-whatsapp")
  if (offerTrigger) {
    e.preventDefault()
    const plan = offerTrigger.dataset.plan || "Atyant plan"
    const price = offerTrigger.dataset.price || "the shown price"
    const offerMessage = buildOfferWhatsappMessage(plan, price)
    openDirectWhatsapp(offerMessage)
  }
})

showStep(currentStep)
updatePreview()

const canvas = document.getElementById("bgCanvas")
const ctx = canvas.getContext("2d")

let dots = []

function resizeCanvas() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  dots = []
  const count = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 22000))

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

function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i]
    dot.x += dot.vx
    dot.y += dot.vy

    if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1
    if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1

    ctx.beginPath()
    ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(47, 102, 255, 0.22)"
    ctx.fill()

    for (let j = i + 1; j < dots.length; j++) {
      const dot2 = dots[j]
      const dx = dot.x - dot2.x
      const dy = dot.y - dot2.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 110) {
        const opacity = (1 - dist / 110) * 0.08
        ctx.beginPath()
        ctx.moveTo(dot.x, dot.y)
        ctx.lineTo(dot2.x, dot2.y)
        ctx.strokeStyle = `rgba(47, 102, 255, ${opacity})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }
  }

  requestAnimationFrame(drawBackground)
}

window.addEventListener("resize", resizeCanvas)

resizeCanvas()
drawBackground()
