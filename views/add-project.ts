import { Project } from "@/controllers/project";
import { isValidDateString } from "@/lib/validation-utils";
import { View } from "@/types/global";

const addProjectView = (): View => {
  return {
    template: `
    <h1>Contact Page</h1>
    <form id="addProject">
      <input type="text" id="projectTitle" placeholder="I" />
      <input type="datetime-local" id="projectStart" />
      <input type="datetime-local" id="projectEnd" />
      <button type="submit">submit</button>
    </form>
  `,
    effects: () => {
      const formEl: HTMLFormElement = document.querySelector("#addProject")!;

      if (!formEl) return;

      formEl.addEventListener("submit", (e) => {
        e.preventDefault();

        const titleEl =
          document.querySelector<HTMLInputElement>("#projectTitle")!;
        const startDateEl =
          document.querySelector<HTMLInputElement>("#projectStart")!;
        const endDateEl =
          document.querySelector<HTMLInputElement>("#projectEnd")!;

        let title = titleEl?.value;
        let startDate = startDateEl?.value;
        let endDate = endDateEl?.value;

        if (!title) {
          window.alert("Project title is required!");
          return;
        }
        if (!startDate || !isValidDateString(startDate)) {
          window.alert("Invalid start date!");
          return;
        }
        if (!endDate || !isValidDateString(endDate)) {
          window.alert("Invalid end date!");
          return;
        }

        Project.add({ title: title, start_date: startDate, end_date: endDate });

        titleEl.value = "";
        startDateEl.value = "";
        endDateEl.value = "";

        window.alert("Project created successfully!");
      });
    },
  };
};
export default addProjectView;
