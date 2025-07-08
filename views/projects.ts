import { storeKeys } from "@/lib/constants";
import { formatHumanDate, renderTime } from "@/lib/date-utils";
import { getItem } from "@/lib/store-utils";
import { ProjectInterface } from "@/lib/types";
import { buildUrlWithParam, navigateTo } from "@/lib/url";
import { View } from "@/types/global";

const projectsView = (): View => {
  // Function body: Get data and prepare what to render
  const projects: ProjectInterface[] = getItem(storeKeys.project);

  const renderProjectsList = () => {
    if (!projects?.length) {
      return `
        <li class="not-found">
          <p class="not-found-title">No projects found</p>
          <p>You don't have projects. Please add a project!</p>
        </li>
      `;
    }

    return projects
      .map(
        (project) => `
      <li>
        <div class="card-header">
          <div class="column-stack">
            <div class="titleWrapper">
              <p class="title">${project.title}</p>
              <div class="badge ${project.status == "completed" ? "success" : "error"}">${project.status}</div>
            </div>
            <p class="time">${formatHumanDate(project.start_date)} ~ ${formatHumanDate(project.end_date)} @ ${renderTime(Number(project.duration))} Days.</p>
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
          buildUrlWithParam(`/edit/project`, "id", id);
        }

        if (action === "tasks" && id) {
          buildUrlWithParam(`/tasks`, "project_id", id);
        }
      });

      const addProjectButtonEl: any = document.getElementById("addProject");
      addProjectButtonEl.addEventListener("click", () => {
        navigateTo("/add/project");
      });
    },
    template: `
      <style>
        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        ul li {
          padding: calc(var(--round-lg) * 0.5) calc(var(--round-lg) * 0.75);
          border-radius: calc(var(--round-lg) * 0.7);
          background-color: rgba(100, 40, 40, 0.4);
          backdrop-filter: blur(4px);
          color: var(--fg-secondary);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .card-header .title {
          font-size: calc(var(--base-typography-size) * 1.111);
          font-weight: 500;
        }
        .card-header .stack {
          display: flex;
          gap: 8px;
        }
        .card-header .column-stack {
          display: flex;
          flex-direction: column;
        }
        .card-header .time {
          font-size: calc(var(--base-typography-size) * 0.888);
        }
        .action {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .not-found {
          text-align: center;
          font-size: calc(var(--base-typography-size) * 0.888);
        }
        .not-found .not-found-title {
          font-weight: 600;
        }
        .titleWrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      </style>
      <div class="header action">
        <h1>Projects</h1>
        <button class="primary sm" id="addProject">Add</button>
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
