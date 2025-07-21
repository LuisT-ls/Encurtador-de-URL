// Importa as funções necessárias do SDK do Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js'

// Configuração do Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD62B-w91pRTffvTMcEE98JX4axna2-teM',
  authDomain: 'encurtaweb.firebaseapp.com',
  projectId: 'encurtaweb',
  storageBucket: 'encurtaweb.appspot.com',
  messagingSenderId: '796602703766',
  appId: '1:796602703766:web:bda13ff8942152019f07b7'
}

// Inicializa o Firebase
const app = initializeApp(firebaseConfig)

// Inicializa e exporta o Firestore
export const db = getFirestore(app)
