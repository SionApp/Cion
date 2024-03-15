<template>
  <q-page>
    <div class="rounded-top">
      Contenido del div con efecto redondo en la parte superior.
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../boot/supabase";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();

// Puedes acceder directamente a los getters del store
</script>

<style scoped>
.rounded-top {
  background-color: #f0f0f0;
  width: 300px;
  height: 300px;
  position: relative;
  padding: 20px;
}

.rounded-top::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 20px;
  /* Altura de la parte redondeada */
  background-color: #f0f0f0;
  border-radius: 50% 50% 0 0;
  /* Redondea solo la parte superior */
}
</style>
