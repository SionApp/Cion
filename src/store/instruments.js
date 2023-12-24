import { defineStore } from "pinia";
import { supabase } from "../boot/supabase";

export const useInstrumentsStore = defineStore("instrument", {
  state: () => ({
    instruments: null,
  }),
  actions: {
    async getInstruments() {
      const { data: instruments, error } = await supabase
        .from("instruments")
        .select(`id, name`);
      this.instruments = instruments;
      if (error) throw error;
    },
    async assignInstruments(payload) {
      try {
        const { error } = await supabase
          .from("user_instrument")
          .insert(payload);
        if (error) {
          throw error;
        }
      } catch (error) {
        throw error;
      }
    },
    async removeInstrument(userId, instrumentId) {
      try {
        const { error } = await supabase
          .from("user_instrument")
          .delete()
          .eq("user_id", userId)
          .eq("instrument_id", instrumentId);
      } catch (e) {
        throw e;
      }
    },
  },
});
