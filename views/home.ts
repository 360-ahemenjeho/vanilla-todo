import { uppercase } from "@/lib/str-utils";

const homePage = () => {
  return `
    <h1>Home ${uppercase("page")}</h1>
    <button>Logout</button>
  `;
};
export default homePage;
