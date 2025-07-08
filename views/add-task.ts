import { Project } from "@/controllers/project";
import { storeKeys } from "@/lib/constants";
import { getItem } from "@/lib/store-utils";
import { TaskInterface } from "@/lib/types";
import { navigateTo } from "@/lib/url";
import { isValidDateString } from "@/lib/validation-utils";
import { View } from "@/types/global";

const addTaskView = (): View => {
  return {
    effects: () => {
      const backButtonEl: any = document.getElementById("backButton");
      backButtonEl.addEventListener("click", () => {
        navigateTo("/projects");
      });

      // Fetch projects and populate select
      const projectSelectEl =
        document.querySelector<HTMLSelectElement>("#projectId");
      if (projectSelectEl) {
        const projects = getItem(storeKeys.project);

        // Clear existing options (except default ones if needed)
        projectSelectEl.innerHTML =
          '<option value="">Select a project</option>';

        // Add project options
        projects.forEach((project: TaskInterface) => {
          const option: any = document.createElement("option");
          option.value = project.id;
          option.textContent = project.title;
          projectSelectEl.appendChild(option);
        });
      }

      const formEl: HTMLFormElement = document.querySelector("addTask")!;

      if (!formEl) return;

      formEl.addEventListener("submit", (e) => {
        e.preventDefault();

        const titleEl = document.querySelector<HTMLInputElement>("#taskTitle")!;
        const startDateEl =
          document.querySelector<HTMLInputElement>("#taskStart")!;
        const endDateEl = document.querySelector<HTMLInputElement>("#taskEnd")!;

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
          navigateTo("/projects");
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
        <form id="addTask">
          <div class="form-group">
            <label for="taskTitle">Title</label>
            <input class="full" type="text" id="taskTitle" />
          </div>
          <div class="form-group">
            <label for="taskStart">Start Date</label>
            <input class="full" type="datetime-local" id="taskStart" />
          </div>
          <div class="form-group">
            <label for="taskEnd">End Date</label>
            <input class="full" type="datetime-local" id="taskEnd" />
          </div>
          <div class="form-group">
            <label for="projectId">Project</label>
            <select id="projectId" class="full">
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
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
export default addTaskView;
