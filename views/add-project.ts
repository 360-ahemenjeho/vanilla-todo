import { Project } from "@/controllers/project";
import { isValidDateString } from "@/lib/validation-utils";
import { View } from "@/types/global";

const addProjectView = (): View => {
  return {
    template: `
    <style>
      .header {
        padding: calc(var(--round-lg) * 0.5) calc(var(--round-lg) * 1.333);
        border-bottom: 1px solid var(--divider-border);
      }
      .content {
        padding: calc(var(--round-lg) * 0.5) calc(var(--round-lg) * 1.333);
      }
    </style>
    <div>
      <div class="header">
        <h2>Add Project</h2>
      </div>
      <div class="content">
        <form id="addProject">
          <input type="text" id="projectTitle" placeholder="I" />
          <input type="datetime-local" id="projectStart" />
          <input type="datetime-local" id="projectEnd" />
          <button type="submit">Submit Project</button>
        </form>
      </div>
    </div>
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

        window.alert("Project added successfully!");
      });
    },
  };
};
export default addProjectView;
