import { storeKeys } from "@/lib/constants";
import { getItem } from "@/lib/store-utils";
import { ProjectInterface } from "@/lib/types";
import { View } from "@/types/global";

const projectsView = (): View => {
  return {
    template: `
      <style>
        ul {
          margin: 0;
          padding: 0;
          list-style-type: none;
        },
        li {
        background-color: 'red'
        }
      </style>
      <div class="header">
        <h1>Projects</h1>
      </div>
      <div class="content">
        <ul id="projects-list"></ul>
      </div>
    `,
    effects: () => {
      const projects: ProjectInterface[] = getItem(storeKeys.project);
      const projectsListEl: any = document.getElementById("projects-list");
      if (!projects) {
        const noFoundLiEl = document.createElement("li");
        noFoundLiEl.textContent = "No projects found";
        projectsListEl.appendChild(noFoundLiEl);
        return;
      }
      projects?.forEach((projectItem: ProjectInterface) => {
        const liEl = document.createElement("li");
        liEl.textContent = projectItem.title;
        projectsListEl.appendChild(liEl);
      });
    },
  };
};

export default projectsView;
