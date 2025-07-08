import {
  addProjectView,
  editProjectView,
  editTaskView,
  notFoundView,
  projectsView,
  tasksView,
} from "@/views";
import addTaskView from "@/views/add-task";

export default function router() {
  const pathname = window.location.pathname;

  switch (pathname) {
    case "/":
      return projectsView;
    case "/tasks":
      return tasksView;
    case "/add/project":
      return addProjectView;
    case "/edit/project":
      return editProjectView;
    case "/add/task":
      return addTaskView;
    case "/edit/task":
      return editTaskView;
    default:
      return notFoundView;
  }
}
