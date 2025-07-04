import { configureRouter } from "@/boot/app";
import router from "@/routes";

const rootEl: any = document.querySelector<HTMLElement>("#root");
configureRouter(rootEl, router());
