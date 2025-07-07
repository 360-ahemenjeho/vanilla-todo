import { storeKeys } from "@/lib/constants";
import { getItem, setItem } from "@/lib/store-utils";
import { ProjectInterface } from "@/lib/types";

export class Project {
  static add({ title, start_date, end_date }: ProjectInterface): boolean {
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
    };

    const previousProjects = getItem(storeKeys.project) ?? [];
    const newProjects = [...previousProjects, project];

    setItem(storeKeys.project, newProjects);
    return true;
  }
}
