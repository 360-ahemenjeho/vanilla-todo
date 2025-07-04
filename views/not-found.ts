import { View } from "@/types/global";

const notFoundView = (): View => {
  return {
    template: "<h1>Not found</h1>",
    effects: () => {
      console.log("oops");
    },
  };
};

export default notFoundView;
