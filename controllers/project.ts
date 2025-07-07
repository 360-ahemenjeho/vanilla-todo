import { storeKeys } from "@/lib/constants";
import { getItem, setItem } from "@/lib/store-utils";
import { ProjectInterface } from "@/lib/types";

export class Project {
  static add({
    title,
    start_date,
    end_date,
    status,
  }: ProjectInterface): boolean {
    const id = crypto.randomUUID();

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    const duration = endDate.getTime() - startDate.getTime();

    const project = {
      title,
      start_date,
      end_date,
      duration,
      id,
      status,
    };

    const previousProjects = getItem(storeKeys.project) ?? [];
    const newProjects = [...previousProjects, project];

    setItem(storeKeys.project, newProjects);
    return true;
  }

  static update(
    id: string,
    { title, start_date, end_date, status }: ProjectInterface,
  ): boolean {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    const duration = endDate.getTime() - startDate.getTime();

    const updatedProject = {
      title,
      start_date,
      end_date,
      duration,
      id,
      status,
    };

    const previousProjects = getItem(storeKeys.project) ?? [];
    const projectIndex = previousProjects.findIndex(
      (project: any) => project.id === id,
    );

    if (projectIndex === -1) {
      return false;
    }

    const newProjects = [...previousProjects];
    newProjects[projectIndex] = updatedProject;

    setItem(storeKeys.project, newProjects);
    return true;
  }

  static view(id: string): ProjectInterface | null {
    const projects = getItem(storeKeys.project) ?? [];
    const project = projects.find((project: any) => project.id === id);
    return project || null;
  }
}
