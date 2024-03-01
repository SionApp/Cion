import { defineStore } from "pinia";
import { supabase } from "../boot/supabase";
import useNotify from "src/composables/useNotify";

const notify = useNotify();

export const useChurchEventStore = defineStore("churchEvent", {
  state: () => ({
    status: [],
  }),
  actions: {
    async createEventChurch(payload) {
      try {
        const { data: createdEvent, error } = await supabase
          .from("event")
          .insert(payload);
        notify.success("Evento Creado!");
        this.status.push("Created");
      } catch (error) {
        if (error) {
          console.log(error);
          notify.notifyError(`Error al crear el evento, ${error}`);
        }
      }
    },
  },
});