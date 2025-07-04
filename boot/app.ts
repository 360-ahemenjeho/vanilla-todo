import { View } from "@/types/global";

/**
 * Renders the given HTML view inside the specified root element.
 * Also removes any existing <style> tags to prevent style stacking.
 */
function renderView(rootEl: HTMLElement, viewHTML: string): void {
  if (!rootEl) {
    console.error("Root element not provided or not found.");
    return;
  }

  // Remove old styles
  rootEl.querySelectorAll("style").forEach((style) => style.remove());

  // Inject new view
  rootEl.innerHTML = viewHTML;
}

/**
 * Sets up automatic routing for the given root element.
 * Handles initial render and browser navigation events.
 * Returns a cleanup function to remove event listeners.
 */
function setupRouter(rootEl: HTMLElement, routerFn: () => View) {
  if (!rootEl) {
    console.error("Root element not provided or not found.");
    return;
  }

  function handleRouteChange(): void {
    const { html, setup } = routerFn();
    renderView(rootEl, html);
    setup?.();
  }

  handleRouteChange();
  window.addEventListener("popstate", handleRouteChange);
}
