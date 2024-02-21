import { supabase } from "../boot/supabase";

const isAuthenticated = async () => {
  const { data: session, error } = await supabase.auth.getSession();
  if (error) return false;
  return !!session;
};

export async function authGuard(to, from, next) {
  const authenticated = await isAuthenticated();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authenticated) {
      return next("/login");
    }
  }
  if (to.meta.requiresGuest) {
    return next("/");
  }

  return next();
}
