import { Project } from "@/controllers/project";
import { navigateTo } from "@/lib/url";
import { isValidDateString } from "@/lib/validation-utils";
import { View } from "@/types/global";

const addProjectView = (): View => {
  return {
    effects: () => {
      const backButtonEl: any = document.getElementById("backButton");
      backButtonEl.addEventListener("click", () => {
        navigateTo("/");
      });

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

        const result = Project.add({
          title: title,
          start_date: startDate,
          end_date: endDate,
          status: "pending",
        });

        if (result) {
          titleEl.value = "";
          startDateEl.value = "";
          endDateEl.value = "";

          window.alert("Project added successfully!");
          navigateTo("/");
        } else window.alert("Failed to add project!");
      });
    },
    template: `
    <style>
      form {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .action {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 16px;
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
          <div class="action">
            <button type="button" class="secondary md" id="backButton">Back</button>
            <button type="submit" class="primary md">Submit</button>
          </div>
        </form>
      </div>
    </div>
  `,
  };
};
export default addProjectView;
