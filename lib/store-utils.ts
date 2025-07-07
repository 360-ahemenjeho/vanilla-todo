export function setItem(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getItem(key: string): any {
  return JSON.parse(localStorage.getItem(key) || "null");
}

export function removeItem(key: string) {
  localStorage.removeItem(key);
}
