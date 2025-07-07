export class URLNavigation {
  private pathname: string;

  constructor(pathname: string) {
    this.pathname = pathname;
  }

  setParam(key: string, value: string): void {
    const url = new URL(window.location.origin + this.pathname);
    url.searchParams.set(key, value);
    window.history.pushState(null, "", url);
  }

  getParam(param: string): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  }

  removeParam(param: string): void {
    const url = new URL(window.location.origin + this.pathname);
    url.searchParams.delete(param);
    window.history.pushState(null, "", url);
  }

  static navigateTo(pathname: string): void {
    const url = new URL(window.location.origin + pathname);
    window.history.pushState(null, "", url);
  }

  static navigateBack(): void {
    window.history.back();
  }

  static navigateForward(): void {
    window.history.forward();
  }
}
