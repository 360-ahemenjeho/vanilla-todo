import { Project } from "@/controllers/project";
import { storeKeys } from "@/lib/constants";
import { renderTime, formatHumanDate } from "@/lib/date-utils";
import { getItem } from "@/lib/store-utils";
import { TaskInterface } from "@/lib/types";
import { buildUrlWithParam, getUrlParam, navigateTo } from "@/lib/url";
import { View } from "@/types/global";

const tasksView = (): View => {
  const projectId = getUrlParam("project_id");

  if (!projectId) {
    navigateTo("/");
    return { effects: () => {}, template: "" };
  }

  const projectDetails: any = Project.view(projectId);
  const allTasks: TaskInterface[] = getItem(storeKeys.task);
  const tasks = allTasks?.filter((task) => task.project_id === projectId);

  const renderTaskLists = () => {
    if (!tasks?.length) {
      return `
        <li class="not-found">
          <p class="not-found-title">This project don't have tasks.</p>
          <p>You don't have tasks. Please add a task!</p>
        </li>
      `;
    }

    return tasks
      .map(
        (task) => `
      <li>
        <div class="card-header">
          <div class="column-stack">
            <div class="titleWrapper">
              <p class="title">${task.title}</p>
              <div class="badge ${task.status == "completed" ? "success" : "error"}">${task.status}</div>
            </div>
            <p class="time">${formatHumanDate(task.start_date)} ~ ${formatHumanDate(task.end_date)} @ ${renderTime(Number(task.duration))}</p>
          </div>
          <div class="stack">
            <button class="primary sm" data-action="edit" data-id="${task.id}">Edit</button>
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
          buildUrlWithParam(`/edit/task`, "id", id);
        }
      });

      const addProjectButtonEl: any = document.getElementById("addTask");
      addProjectButtonEl.addEventListener("click", () => {
        navigateTo("/add/task");
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
        .time {
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
        <div class="titleWrapper">
          <h1>${projectDetails?.title}</h1>
          <p class="time">${formatHumanDate(projectDetails?.start_date)} ~ ${formatHumanDate(projectDetails.end_date)} @ ${renderTime(Number(projectDetails.duration))}</p>
        </div>
        <button class="primary sm" id="addTask">Add</button>
      </div>
      <div class="content">
        <ul id="projects-list">
          ${renderTaskLists()}
        </ul>
      </div>
    `,
  };
};

export default tasksView;
