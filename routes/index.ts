import {
  addProjectView,
  editProjectView,
  notFoundView,
  projectsView,
} from "@/views";

export default function router() {
  const pathname = window.location.pathname;

  switch (pathname) {
    case "/add/project":
      return addProjectView;
    case "/projects":
      return projectsView;
    case "/edit/project":
      return editProjectView;
    default:
      return notFoundView;
  }
}
