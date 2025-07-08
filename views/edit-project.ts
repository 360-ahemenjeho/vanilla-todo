import { Project } from "@/controllers/project";
import { getUrlParam, navigateTo } from "@/lib/url";
import { isValidDateString } from "@/lib/validation-utils";
import { View } from "@/types/global";

const editProjectView = (): View => {
  const id = getUrlParam("id");

  if (!id) {
    navigateTo("/");
    return { effects: () => {}, template: "" };
  }

  const projectDetails = Project.view(id);

  return {
    effects: () => {
      const backButtonEl: any = document.getElementById("backButton");
      backButtonEl.addEventListener("click", () => {
        navigateTo("/");
      });

      // Populate form fields with existing project data
      const titleEl =
        document.querySelector<HTMLInputElement>("#projectTitle")!;
      const startDateEl =
        document.querySelector<HTMLInputElement>("#projectStart")!;
      const endDateEl =
        document.querySelector<HTMLInputElement>("#projectEnd")!;
      const statusEl =
        document.querySelector<HTMLInputElement>("#projectStatus")!;

      if (projectDetails) {
        titleEl.value = projectDetails.title || "";
        startDateEl.value = projectDetails.start_date || "";
        endDateEl.value = projectDetails.end_date || "";
        statusEl.value = projectDetails?.status || "pending";
      }

      const formEl: HTMLFormElement = document.querySelector("#editProject")!;

      if (!formEl) return;

      formEl.addEventListener("submit", (e) => {
        e.preventDefault();

        const titleEl =
          document.querySelector<HTMLInputElement>("#projectTitle")!;
        const startDateEl =
          document.querySelector<HTMLInputElement>("#projectStart")!;
        const endDateEl =
          document.querySelector<HTMLInputElement>("#projectEnd")!;
        const statusEl =
          document.querySelector<HTMLInputElement>("#projectStatus")!;

        let title = titleEl?.value;
        let startDate = startDateEl?.value;
        let endDate = endDateEl?.value;
        let status: any = statusEl?.value;

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
        if (!status) {
          window.alert("Project status is required!");
          return;
        }

        const result = Project.update(id, {
          title,
          start_date: startDate,
          end_date: endDate,
          status,
        });

        if (result) {
          window.alert("Project updated successfully!");
          navigateTo("/");
        } else window.alert("Failed to update project!");
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
        <h1>Edit Project</h1>
      </div>
      <div class="content">
        <form id="editProject">
          <div class="form-group">
            <label for="projectTitle">Title</label>
            <input class="full" type="text" id="projectTitle" value="${projectDetails?.title || ""}" />
          </div>
          <div class="form-group">
            <label for="projectStart">Start Date</label>
            <input class="full" type="datetime-local" id="projectStart" value="${projectDetails?.start_date || ""}" />
          </div>
          <div class="form-group">
            <label for="projectEnd">End Date</label>
            <input class="full" type="datetime-local" id="projectEnd" value="${projectDetails?.end_date || ""}" />
          </div>
          <div class="form-group">
            <label for="projectStatus">Status</label>
            <select id="projectStatus" class="full" value="${projectDetails?.status || "pending"}">
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
export default editProjectView;
