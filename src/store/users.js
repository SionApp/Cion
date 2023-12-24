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
      try {
        if (!user) {
          return null;
        }
        const {
          address_line_1,
          address_line_2,
          first_name,
          last_name,
          phone_number,
          phone_number_2,
          auth_id,
          ...rest
        } = user;
        const personal_details = {
          first_name,
          last_name,
          phone_number,
          phone_number_2,
          auth_id,
          ...rest,
        };
        const address = { address: { address_line_1, address_line_2 } };
        const payload = {
          ...address,
          ...personal_details,
        };
        const { data: userCreated, error } = await supabase
          .from("users")
          .insert(payload);
        if (error) {
          throw error;
        }
        this.fetchUsers();
        return [userCreated];
      } catch (error) {
        throw error;
        return false;
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
