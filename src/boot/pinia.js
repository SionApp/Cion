import { createPinia } from "pinia";

export const pinia = createPinia();

export default ({ app }) => {
  app.use(pinia);
};
