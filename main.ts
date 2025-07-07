import { configureRouter } from "@/boot/app";
import router from "@/routes";

const rootEl = document.querySelector<HTMLElement>("#root");
if (rootEl) {
  const cleanup = configureRouter(rootEl, router());
  cleanup();
}
