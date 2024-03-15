import { defineStore } from "pinia";
import { supabase } from "../boot/supabase";
import useNotify from "src/composables/useNotify";

const notify = useNotify();

export const useChurchEventStore = defineStore("churchEvent", {
  state: () => ({
    status: null,
  }),
  actions: {
    async createEventChurch(payload) {
      try {
        const { data: createdEvent, error } = await supabase
          .from("events")
          .insert(payload);
        if (!error) {
          notify.notifySuccess("Evento Creado!");
          this.status = "created";
        }
      } catch (error) {
        if (error) {
          console.log(error);
          notify.notifyError(`Error al crear el evento, ${error}`);
          throw error;
        }
      }
    },
  },
});
