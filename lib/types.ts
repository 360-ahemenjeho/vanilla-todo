export interface ProjectInterface {
  title: string;
  id?: string;
  start_date: string;
  end_date: string;
  duration?: string;
}

export interface TodoInterface {
  id?: string;
  title: string;
  description: string;
  done: boolean;
  start: string;
  end: string;
  priority: "later" | "soon" | "urgent";
}

export interface ProjectEventElInterface {
  titleEl: HTMLInputElement;
  startDateEl: HTMLInputElement;
  endDateEl: HTMLInputElement;
}
