import { storeKeys } from "@/lib/constants";
import { getItem, setItem } from "@/lib/store-utils";
import { TaskInterface } from "@/lib/types";

export class Task {
  static add({
    title,
    start_date,
    end_date,
    status,
    project_id,
  }: TaskInterface): boolean {
    const id = crypto.randomUUID();

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    const duration = endDate.getTime() - startDate.getTime();

    const task = {
      title,
      start_date,
      end_date,
      duration,
      id,
      status,
      project_id,
    };

    const previousTasks = getItem(storeKeys.project) ?? [];
    const newTasks = [...previousTasks, task];

    setItem(storeKeys.task, newTasks);
    return true;
  }

  // static update(
  //   id: string,
  //   { title, start_date, end_date, status }: ProjectInterface,
  // ): boolean {
  //   const startDate = new Date(start_date);
  //   const endDate = new Date(end_date);

  //   const duration = endDate.getTime() - startDate.getTime();

  //   const updatedProject = {
  //     title,
  //     start_date,
  //     end_date,
  //     duration,
  //     id,
  //     status,
  //   };

  //   const previousProjects = getItem(storeKeys.project) ?? [];
  //   const projectIndex = previousProjects.findIndex(
  //     (project: any) => project.id === id,
  //   );

  //   if (projectIndex === -1) {
  //     return false;
  //   }

  //   const newProjects = [...previousProjects];
  //   newProjects[projectIndex] = updatedProject;

  //   setItem(storeKeys.project, newProjects);
  //   return true;
  // }

  // static view(id: string): ProjectInterface | null {
  //   const projects = getItem(storeKeys.project) ?? [];
  //   const project = projects.find((project: any) => project.id === id);
  //   return project || null;
  // }
}
