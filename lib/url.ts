export function buildUrlWithParam(
  pathname: string,
  key: string,
  value: string,
): string {
  const url = new URL(window.location.origin + pathname);
  url.searchParams.set(key, value);
  return url.toString();
}

export function getUrlParam(param: string): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

export function removeUrlParam(param: string): void {
  const url = new URL(window.location.href);
  url.searchParams.delete(param);
  window.history.pushState(null, "", url);
}

export function navigateTo(pathname: string): void {
  const url = new URL(window.location.origin + pathname);
  window.history.pushState(null, "", url);
}

export function navigateBack(): void {
  window.history.back();
}

export function navigateForward(): void {
  window.history.forward();
}
