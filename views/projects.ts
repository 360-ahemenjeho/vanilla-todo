import { storeKeys } from "@/lib/constants";
import { convertSeconds, formatHumanDate } from "@/lib/date-utils";
import { getItem } from "@/lib/store-utils";
import { ProjectInterface } from "@/lib/types";
import { URLNavigation } from "@/lib/url";
import { View } from "@/types/global";

const projectsView = (): View => {
  return {
    effects: () => {
      const projects: ProjectInterface[] = getItem(storeKeys.project);
      const projectsListEl: any = document.getElementById("projects-list");
      if (!projects) {
        const noFoundLiEl = document.createElement("li");
        noFoundLiEl.textContent = "No projects found";
        projectsListEl.appendChild(noFoundLiEl);
        return;
      }

      function viewProject(id: string | null) {
        if (id === null) return;
        const url = new URLNavigation(`/edit/project`);
        url.setParam("id", id);
      }

      projects?.forEach((projectItem: ProjectInterface) => {
        const liEl = document.createElement("li");

        // project header
        const headerEl = document.createElement("div");
        const headerActionsEl = document.createElement("div");
        const titleWrapperEl = document.createElement("div");
        const titleEl = document.createElement("p");
        const primaryActionEl = document.createElement("button");
        const secondaryActionEl = document.createElement("button");
        const timeEl = document.createElement("p");

        titleEl.setAttribute("class", "title");
        timeEl.setAttribute("class", "time");
        primaryActionEl.setAttribute("class", "primary sm");
        secondaryActionEl.setAttribute("class", "secondary sm");
        headerEl.setAttribute("class", "card-header");
        headerActionsEl.setAttribute("class", "stack");
        titleWrapperEl.setAttribute("class", "column-stack");

        titleEl.textContent = projectItem.title;
        timeEl.textContent = `${formatHumanDate(projectItem.start_date)} - ${formatHumanDate(projectItem.end_date)} @ ${convertSeconds(Number(projectItem.duration), "d")} Days`;
        titleWrapperEl.appendChild(titleEl);
        titleWrapperEl.appendChild(timeEl);

        primaryActionEl.textContent = "Edit";
        secondaryActionEl.textContent = "Tasks";

        primaryActionEl.addEventListener("click", () =>
          viewProject(projectItem.id || null),
        );

        headerActionsEl.appendChild(secondaryActionEl);
        headerActionsEl.appendChild(primaryActionEl);

        headerEl.appendChild(titleWrapperEl);
        headerEl.appendChild(headerActionsEl);

        liEl.appendChild(headerEl);
        projectsListEl.appendChild(liEl);
      });
    },
    template: `
      <style>
        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }
        ul li {
          display: flex;
          flex-direction: column;
          gap: calc(var(--round-lg) * 0.5);
          padding: calc(var(--round-lg) * 0.5) calc(var(--round-lg) * 0.75);
          border-radius: calc(var(--round-lg) * 0.5);
          background-color: rgba(100, 40, 40, 0.4);
          backdrop-filter: blur(4px);
          color: var(--fg-secondary);
          display: flex;
          flex-direction: column;
          gap: calc(var(--round-lg) * 0.5);
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
      </style>
      <div class="header">
        <h1>Projects</h1>
      </div>
      <div class="content">
        <ul id="projects-list"></ul>
      </div>
    `,
  };
};

export default projectsView;
