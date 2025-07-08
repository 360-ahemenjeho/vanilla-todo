import { Task } from "@/controllers/task";
import { storeKeys } from "@/lib/constants";
import { getItem } from "@/lib/store-utils";
import { TaskInterface } from "@/lib/types";
import { getUrlParam, navigateTo } from "@/lib/url";
import { isValidDateString } from "@/lib/validation-utils";
import { View } from "@/types/global";

const editTaskView = (): View => {
  const id = getUrlParam("id");

  if (!id) {
    navigateTo("/");
    return { effects: () => {}, template: "" };
  }

  const taskDetails = Task.view(id);

  return {
    effects: () => {
      const backButtonEl = document.getElementById("backButton");
      backButtonEl?.addEventListener("click", () => {
        navigateTo("/");
      });

      const formEl = document.querySelector<HTMLFormElement>("#editTask");
      const titleEl = document.querySelector<HTMLInputElement>("#taskTitle");
      const startDateEl =
        document.querySelector<HTMLInputElement>("#taskStart");
      const endDateEl = document.querySelector<HTMLInputElement>("#taskEnd");
      const projectSelectEl =
        document.querySelector<HTMLSelectElement>("#projectId");
      const statusEl = document.querySelector<HTMLSelectElement>("#taskStatus");

      if (
        !formEl ||
        !titleEl ||
        !startDateEl ||
        !endDateEl ||
        !projectSelectEl ||
        !statusEl
      ) {
        console.error("Required form elements not found");
        return;
      }

      // Populate form fields with existing task data
      if (taskDetails) {
        titleEl.value = taskDetails.title || "";
        startDateEl.value = taskDetails.start_date || "";
        endDateEl.value = taskDetails.end_date || "";
        statusEl.value = taskDetails.status || "pending";
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

          // Select the current project
          if (taskDetails && project.id === taskDetails.project_id) {
            option.selected = true;
          }

          projectSelectEl.appendChild(option);
        });
      }

      formEl.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = titleEl.value.trim();
        const startDate = startDateEl.value;
        const endDate = endDateEl.value;
        const projectId = projectSelectEl.value;
        const status: any = statusEl.value;

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
        if (!status) {
          window.alert("Task status is required!");
          return;
        }

        const result = Task.update(id, {
          title,
          start_date: startDate,
          end_date: endDate,
          status,
          project_id: projectId,
        });

        if (result) {
          window.alert("Task updated successfully!");
          navigateTo("/");
        } else {
          window.alert("Failed to update task!");
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
        <h1>Edit Task</h1>
      </div>
      <div class="content">
        <form id="editTask">
          <div class="form-group">
            <label for="taskTitle">Title</label>
            <input class="full" type="text" id="taskTitle" value="${taskDetails?.title || ""}" />
          </div>
          <div class="form-group">
            <label for="taskStart">Start Date</label>
            <input class="full" type="datetime-local" id="taskStart" value="${taskDetails?.start_date || ""}" />
          </div>
          <div class="form-group">
            <label for="taskEnd">End Date</label>
            <input class="full" type="datetime-local" id="taskEnd" value="${taskDetails?.end_date || ""}" />
          </div>
          <div class="form-group">
            <label for="projectId">Project</label>
            <select id="projectId" class="full"></select>
          </div>
          <div class="form-group">
            <label for="taskStatus">Status</label>
            <select id="taskStatus" class="full" value="${taskDetails?.status || "pending"}">
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div class="action">
            <button type="button" class="secondary md" id="backButton">Back</button>
            <button type="submit" class="primary md">Update</button>
          </div>
        </form>
      </div>
    </div>
  `,
  };
};
export default editTaskView;
