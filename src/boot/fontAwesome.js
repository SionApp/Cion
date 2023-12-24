import { library } from "@fortawesome/fontawesome-svg-core";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faGoogle);

export default async ({ app, router, Vue }) => {
  // Vue.component("font-awesome-icon", FontAwesomeIcon);
};
