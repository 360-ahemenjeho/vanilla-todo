import { View } from "@/types/global";

const notFoundView = (): View => {
  return {
    template: "<h1>Not found</h1>",
    effects: () => {
      console.log("Oop! Page not found!");
    },
  };
};

export default notFoundView;
