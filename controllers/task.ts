import { storeKeys } from "@/lib/constants";
import { getItem, setItem } from "@/lib/store-utils";
import { TaskInterface } from "@/lib/types";
import { projectsView } from "@/views";

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

    const previousTasks = getItem(storeKeys.task) ?? [];
    const newTasks = [...previousTasks, task];

    setItem(storeKeys.task, newTasks);
    return true;
  }

  static update(
    id: string,
    { title, start_date, end_date, status, project_id }: TaskInterface,
  ): boolean {
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    const duration = endDate.getTime() - startDate.getTime();

    const updatedTask = {
      title,
      start_date,
      end_date,
      duration,
      id,
      status,
      project_id,
    };

    const previousTasks = getItem(storeKeys.task) ?? [];
    const taskIndex = previousTasks.findIndex(
      (project: any) => project.id === id,
    );

    if (taskIndex === -1) {
      return false;
    }

    const newTasks = [...previousTasks];
    newTasks[taskIndex] = updatedTask;

    setItem(storeKeys.task, newTasks);
    return true;
  }

  static view(id: string): TaskInterface | null {
    const tasks = getItem(storeKeys.task) ?? [];
    const task = tasks.find((task: any) => task.id === id);
    return task || null;
  }
}
