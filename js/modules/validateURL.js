// Função para validar se uma string é uma URL válida
export function isValidURL(string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}
