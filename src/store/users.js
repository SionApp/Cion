import { defineStore } from "pinia";

import { supabase } from "../boot/supabase";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
  }),

  actions: {
    async fetchUsers() {
      const { data, error } = await supabase
        .from("users")
        .select(`*, roles(id,name)`);
      if (error) {
        throw error;
      }
      this.users = data;
    },

    async createUser(user) {
      if (!user) {
        return null;
      }

      const payload = {
        address: { address_line_1, address_line_2 },
        ...user,
      };

      try {
        const { data: userCreated, error } = await supabase
          .from("users")
          .insert(payload);

        if (error) {
          throw new Error("Error creating user:", error);
        }

        return userCreated;
      } catch (error) {
        throw error;
      }
    },

    async updateUser(user) {
      if (!user.auth_id) {
        return false;
      }
      try {
        const { error } = await supabase
          .from("users")
          .update(user)
          .eq("id", user.id);
        if (error) {
          throw error;
        }
        this.fetchUsers();
      } catch (error) {
        throw error;
      }
    },
  },
});
