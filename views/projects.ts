import { storeKeys } from "@/lib/constants";
import { convertSeconds, formatHumanDate } from "@/lib/date-utils";
import { getItem } from "@/lib/store-utils";
import { ProjectInterface } from "@/lib/types";
import { URLNavigation } from "@/lib/url";
import { View } from "@/types/global";

const projectsView = (): View => {
  // Function body: Get data and prepare what to render
  const projects: ProjectInterface[] = getItem(storeKeys.project);

  const renderProjectsList = () => {
    if (!projects?.length) {
      return "<li>No projects found</li>";
    }

    return projects
      .map(
        (project) => `
      <li>
        <div class="card-header">
          <div class="column-stack">
            <p class="title">${project.title}</p>
            <p class="time">${formatHumanDate(project.start_date)} - ${formatHumanDate(project.end_date)} @ ${convertSeconds(Number(project.duration), "d")} Days</p>
          </div>
          <div class="stack">
            <button class="secondary sm" data-action="tasks" data-id="${project.id}">Tasks</button>
            <button class="primary sm" data-action="edit" data-id="${project.id}">Edit</button>
          </div>
        </div>
      </li>
    `,
      )
      .join("");
  };

  return {
    effects: () => {
      // Effects: Only handle interactions after render
      const projectsListEl = document.getElementById("projects-list");
      if (!projectsListEl) return;

      projectsListEl.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const action = target.dataset.action;
        const id = target.dataset.id;

        if (action === "edit" && id) {
          const url = new URLNavigation(`/edit/project`);
          url.setParam("id", id);
          URLNavigation.navigateTo(url.toString()); // Actually navigate!
        }
        // Handle tasks action...
      });
    },
    template: `
      <!-- styles -->
      <div class="header">
        <h1>Projects</h1>
      </div>
      <div class="content">
        <ul id="projects-list">
          ${renderProjectsList()}
        </ul>
      </div>
    `,
  };
};

export default projectsView;
