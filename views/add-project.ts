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
        padding: calc(var(--round-lg) * 0.4) calc(var(--round-lg) * 1.333);
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    </style>
    <div>
      <div class="header">
        <h2>Add Project</h2>
      </div>
      <div class="content">
        <form id="addProject">
          <div>
              <input class="full" type="text" id="projectTitle" />
          </div>
          <div>
            <input class="full" type="datetime-local" id="projectStart" />
          </div>
          <div>
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
