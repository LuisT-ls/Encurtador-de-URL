import { db } from './firebaseConfig.js'
import {
  collection,
  doc,
  setDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js'

// Função para gerar um ID aleatório de 6 caracteres
function generateShortId(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Função principal para encurtar a URL
export async function shortenURL(originalURL) {
  const shortId = generateShortId()
  const urlRef = doc(collection(db, 'urls'), shortId)
  await setDoc(urlRef, {
    originalURL,
    createdAt: serverTimestamp(),
    clicks: 0
  })
  return `${window.location.origin}/redirect.html?i=${shortId}`
}
