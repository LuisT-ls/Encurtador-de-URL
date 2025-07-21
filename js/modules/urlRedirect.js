import { db } from './firebaseConfig.js'
import {
  doc,
  getDoc,
  updateDoc,
  increment
} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js'

// Função para obter o parâmetro 'i' da URL
function getShortIdFromURL() {
  const params = new URLSearchParams(window.location.search)
  return params.get('i')
}

// Função principal de redirecionamento
export async function handleRedirect() {
  const shortId = getShortIdFromURL()
  if (!shortId) {
    document.body.textContent = 'ID de URL inválido.'
    return
  }

  const urlRef = doc(db, 'urls', shortId)
  const urlSnap = await getDoc(urlRef)

  if (urlSnap.exists()) {
    const data = urlSnap.data()
    // Incrementa o campo clicks
    await updateDoc(urlRef, { clicks: increment(1) })
    // Redireciona para a URL original
    window.location.href = data.originalURL
  } else {
    document.body.textContent = 'URL não encontrada ou expirada.'
  }
}

// Executa automaticamente ao importar
handleRedirect()
