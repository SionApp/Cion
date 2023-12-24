import { defineStore } from "pinia";
import { supabase } from "../boot/supabase";

export const useRolesStore = defineStore("roles", {
  state: () => ({
    roles: null,
  }),
  actions: {
    async loadRoles() {
      const { data, error } = await supabase.from("roles").select(`id, name`);
      this.roles = data;
      if (error) throw error;
    },
    async assignRole(role, userId) {
      try {
        const { data: roleData } = await supabase
          .from("roles")
          .select("*")
          .eq("id", role)
          .single();

        if (!roleData) {
          throw new Error("Role no exist!");
        }

        const { data, error } = await supabase
          .from("users")
          .update({ role_id: role.id })
          .eq("auth_id", userId);
        if (error) {
          throw error;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
