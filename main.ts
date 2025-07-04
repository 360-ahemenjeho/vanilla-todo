import { setupRouter } from "@/boot/app";
import router from "@/routes";

const rootEl: any = document.querySelector<HTMLElement>("#root");
setupRouter(rootEl, router);
