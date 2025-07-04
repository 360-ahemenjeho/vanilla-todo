import { View } from "@/types/global";

/**
 * Renders the given HTML view inside the specified root element.
 * Also removes any existing <style> tags to prevent style stacking.
 */
function render(rootEl: HTMLElement, template: string): void {
  if (!rootEl) {
    throw new Error("Root element not provided or not found.");
  }

  // Remove old styles
  rootEl.querySelectorAll("style").forEach((style) => style.remove());

  // Inject new view
  rootEl.innerHTML = template;
}

/**
 * Sets up automatic routing for the given root element.
 * Handles initial render and browser navigation events.
 * Returns a cleanup function to remove event listeners.
 */
export function configureRouter(rootEl: HTMLElement, route: () => View) {
  if (!rootEl) {
    throw new Error("Root element not provided or not found.");
    return;
  }

  function handleRouteChange(): void {
    const { template, effects } = route();
    render(rootEl, template);
    effects?.();
  }

  handleRouteChange();
  window.addEventListener("popstate", handleRouteChange);
}
