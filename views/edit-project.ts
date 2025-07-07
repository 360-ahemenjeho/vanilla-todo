import { Project } from "@/controllers/project";
import { URLNavigation } from "@/lib/url";
import { isValidDateString } from "@/lib/validation-utils";
import { View } from "@/types/global";

const editProjectView = (): View => {
  const url = new URLNavigation("/details/project");
  const id = url.getParam("id");

  if (!id) {
    URLNavigation.navigateBack();
    return { effects: () => {}, template: "" };
  }

  const projectDetails = Project.view(id);

  return {
    effects: () => {
      // Populate form fields with existing project data
      const titleEl =
        document.querySelector<HTMLInputElement>("#projectTitle")!;
      const startDateEl =
        document.querySelector<HTMLInputElement>("#projectStart")!;
      const endDateEl =
        document.querySelector<HTMLInputElement>("#projectEnd")!;

      if (projectDetails) {
        titleEl.value = projectDetails.title || "";
        startDateEl.value = projectDetails.start_date || "";
        endDateEl.value = projectDetails.end_date || "";
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

        const result = Project.update(id, {
          title: title,
          start_date: startDate,
          end_date: endDate,
        });

        if (result) {
          window.alert("Project updated successfully!");
          URLNavigation.navigateTo("/projects");
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
          <button type="submit" class="primary md">Update Project</button>
        </form>
      </div>
    </div>
  `,
  };
};
export default editProjectView;
