export interface ProjectInterface {
  title: string;
  id?: string;
  start_date: string;
  end_date: string;
  duration?: string;
  status: "completed" | "pending";
}

export interface TaskInterface {
  title: string;
  id?: string;
  start_date: string;
  end_date: string;
  duration?: string;
  status: "completed" | "pending";
  project_id?: string;
}

export interface ProjectEventElInterface {
  titleEl: HTMLInputElement;
  startDateEl: HTMLInputElement;
  endDateEl: HTMLInputElement;
}
