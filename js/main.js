import { shortenURL } from './modules/urlShortener.js'
import { isValidURL } from './modules/validateURL.js'
import { db } from './modules/firebaseConfig.js'
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs
} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js'

// Seletores dos elementos
const form = document.getElementById('shorten-form')
const urlInput = document.getElementById('url-input')
const resultCard = document.getElementById('result-card')
const shortUrlInput = document.getElementById('short-url')
const copyBtn = document.getElementById('copy-btn')
const copyFeedback = document.getElementById('copy-feedback')
const errorMessage = document.getElementById('error-message')

// Função para animação fadeIn
function fadeIn(element) {
  element.classList.remove('d-none')
  element.style.opacity = 0
  element.style.transition = 'opacity 0.5s'
  requestAnimationFrame(() => {
    element.style.opacity = 1
  })
}

export async function loadHistory() {
  const historyContainer = document.getElementById('history-list')
  if (!historyContainer) return
  historyContainer.innerHTML = ''
  const q = query(
    collection(db, 'urls'),
    orderBy('createdAt', 'desc'),
    limit(10)
  )
  const querySnapshot = await getDocs(q)
  if (querySnapshot.empty) {
    historyContainer.innerHTML =
      '<div class="text-muted">Nenhum histórico encontrado.</div>'
    return
  }
  querySnapshot.forEach(docSnap => {
    const data = docSnap.data()
    const shortId = docSnap.id
    const shortUrl = `${window.location.origin}/redirect.html?i=${shortId}`
    const date =
      data.createdAt && data.createdAt.toDate ? data.createdAt.toDate() : null
    const dateStr = date ? date.toLocaleString('pt-BR') : '-'
    const item = document.createElement('div')
    item.className = 'card mb-3 fade'
    item.innerHTML = `
      <div class="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between">
        <div class="mb-2 mb-md-0">
          <div><strong>Original:</strong> <a href="${
            data.originalURL
          }" target="_blank" rel="noopener">${data.originalURL}</a></div>
          <div><strong>Encurtada:</strong> <a href="${shortUrl}" target="_blank" rel="noopener">${shortUrl}</a></div>
          <div><strong>Data:</strong> ${dateStr}</div>
          <div><strong>Cliques:</strong> ${data.clicks ?? 0}</div>
        </div>
        <button class="btn btn-outline-secondary ms-md-3 mt-2 mt-md-0 copy-history-btn">Copiar</button>
      </div>
    `
    historyContainer.appendChild(item)
    // Fade in animado
    setTimeout(() => {
      item.classList.add('show')
    }, 100)
    // Botão de copiar
    const copyBtn = item.querySelector('.copy-history-btn')
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(shortUrl).then(() => {
        copyBtn.textContent = 'Copiado!'
        setTimeout(() => {
          copyBtn.textContent = 'Copiar'
        }, 1200)
      })
    })
  })
}

form.addEventListener('submit', async e => {
  e.preventDefault()
  errorMessage.classList.add('d-none')
  resultCard.classList.add('d-none')
  copyFeedback.classList.add('d-none')
  const url = urlInput.value.trim()
  if (!isValidURL(url)) {
    errorMessage.textContent = 'Por favor, insira uma URL válida.'
    fadeIn(errorMessage)
    return
  }
  try {
    const shortUrl = await shortenURL(url)
    shortUrlInput.value = shortUrl
    fadeIn(resultCard)
  } catch (err) {
    errorMessage.textContent = 'Erro ao encurtar a URL. Tente novamente.'
    fadeIn(errorMessage)
  }
})

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(shortUrlInput.value).then(() => {
    fadeIn(copyFeedback)
    setTimeout(() => copyFeedback.classList.add('d-none'), 1500)
  })
})
