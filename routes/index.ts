import { addProjectView, notFoundView } from "@/views";

export default function router() {
  const pathname = window.location.pathname;

  switch (pathname) {
    case "/add-project":
      return addProjectView;
    default:
      return notFoundView;
  }
}
