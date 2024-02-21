import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { supabase } from "../boot/supabase";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to) => {
    // See if any of the matched routes has meta "requiresAuth"

    const { data: session } = await supabase.auth.getSession();
    console.log(session);
    if (to.matched.some((route) => route.meta.requiresAuth)) {
      // Yes this route requires authentication. See if the user is authenticated.
      if (session === null) {
        // User is authenticated, we allow access.
        Router.push("/login");
      }
    } else {
      if (session) {
        Router.push({ path: "/" });
      }
    }
  });

  return Router;
});
