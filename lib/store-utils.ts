export function setItem(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function getItem(key: string) {
  localStorage.getItem(key)
}

export function removeItem(key: string) {
  localStorage.removeItem(key)
}
