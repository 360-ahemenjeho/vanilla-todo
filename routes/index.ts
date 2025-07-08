import {
  addProjectView,
  editProjectView,
  notFoundView,
  projectsView,
} from "@/views";
import addTaskView from "@/views/add-task";

export default function router() {
  const pathname = window.location.pathname;

  switch (pathname) {
    case "/":
      return projectsView;
    case "/add/project":
      return addProjectView;
    case "/edit/project":
      return editProjectView;
    case "/add/task":
      return addTaskView;
    default:
      return notFoundView;
  }
}
