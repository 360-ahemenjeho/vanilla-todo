export class URLParam {
  private pathname: string;

  constructor(pathname: string) {
    this.pathname = pathname;
  }

  set(param: string): void {
    const url = new URL(window.location.origin + this.pathname);
    url.searchParams.set("param", param);
    window.history.pushState({}, "", url);
  }

  get(): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get("param");
  }

  remove(): void {
    const url = new URL(window.location.origin + this.pathname);
    url.searchParams.delete("param");
    window.history.pushState({}, "", url);
  }
}
