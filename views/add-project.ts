import { Project } from "@/controllers/project";
import { isValidDateString } from "@/lib/validation-utils";
import { View } from "@/types/global";

const addProjectView = (): View => {
  return {
    template: `
    <style>
      .header {
        padding: calc(var(--round-lg) * 0.4) calc(var(--round-lg) * 1.333);
        border-bottom: 1px solid var(--divider-border);
      }
      .content {
        padding: calc(var(--round-lg) * 1) calc(var(--round-lg) * 1.333);
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    </style>
    <div>
      <div class="header">
        <h1>Add Project</h1>
      </div>
      <div class="content">
        <form id="addProject">
          <div class="form-group">
            <label for="projectTitle">Title</label>
            <input class="full" type="text" id="projectTitle" />
          </div>
          <div class="form-group">
            <label for="projectStart">Start Date</label>
            <input class="full" type="datetime-local" id="projectStart" />
          </div>
          <div class="form-group">
            <label for="projectEnd">End Date</label>
            <input class="full" type="datetime-local" id="projectEnd" />
          </div>
          <button type="submit" class="primary">Submit Project</button>
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
