import { Task } from "@/controllers/task";
import { storeKeys } from "@/lib/constants";
import { getItem } from "@/lib/store-utils";
import { TaskInterface } from "@/lib/types";
import { navigateTo } from "@/lib/url";
import { isValidDateString } from "@/lib/validation-utils";
import { View } from "@/types/global";

const addTaskView = (): View => {
  return {
    effects: () => {
      const backButtonEl = document.getElementById("backButton");
      backButtonEl?.addEventListener("click", () => {
        navigateTo("/");
      });

      const formEl = document.querySelector<HTMLFormElement>("#addTask");
      const titleEl = document.querySelector<HTMLInputElement>("#taskTitle");
      const startDateEl =
        document.querySelector<HTMLInputElement>("#taskStart");
      const endDateEl = document.querySelector<HTMLInputElement>("#taskEnd");
      const projectSelectEl =
        document.querySelector<HTMLSelectElement>("#projectId");

      if (
        !formEl ||
        !titleEl ||
        !startDateEl ||
        !endDateEl ||
        !projectSelectEl
      ) {
        console.error("Required form elements not found");
        return;
      }

      // Fetch projects and populate select
      const projects = getItem(storeKeys.project);

      // Clear existing options and populate with projects
      if (!projects) {
        projectSelectEl.innerHTML =
          "<option disabled>Projects not found</option>";
      } else {
        projectSelectEl.innerHTML =
          "<option disabled>Select a project</option>";

        // Add project options
        projects.forEach((project: TaskInterface) => {
          const option: any = document.createElement("option");
          option.value = project.id;
          option.textContent = project.title;
          projectSelectEl.appendChild(option);
        });
      }

      formEl.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = titleEl.value.trim();
        const startDate = startDateEl.value;
        const endDate = endDateEl.value;
        const projectId = projectSelectEl.value;

        if (!title) {
          window.alert("Task title is required!");
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
        if (!projectId) {
          window.alert("A Project is required!");
          return;
        }

        const result = Task.add({
          title,
          start_date: startDate,
          end_date: endDate,
          status: "pending",
          project_id: projectId,
        });

        if (result) {
          titleEl.value = "";
          startDateEl.value = "";
          endDateEl.value = "";
          projectSelectEl.value = "";

          window.alert("Task added successfully!");
          navigateTo("/");
        } else {
          window.alert("Failed to add task!");
        }
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
        <h1>Add Task</h1>
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
            <select id="projectId" class="full"></select>
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
