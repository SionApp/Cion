<template>
  <div
    class="q-pa-xl window-height window-width fit row wrap justify-center items-center content-center q-gutter-x-md"
  >
    <div class="col-12 text-center self-center">
      <h2>Select One Role</h2>
    </div>
    <div v-for="role in roles" :key="role.id">
      <CardChoose :data="role" @click="selectRole(role)" />
    </div>
    <!--CardChoose />
    <CardChoose /-->
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useRolesStore } from "../store/roles";

import CardChoose from "../components/CardChoose.vue";

onMounted(async () => {
  await getRoles();
});

const rolesStore = useRolesStore();

const { roles } = storeToRefs(rolesStore);

const getRoles = async () => {
  await rolesStore.loadRoles();
};

const selectRole = (role) => {
  return role;
};
</script>

<style>
/* Agregar sombreado cuando se hace hover */
.role-card-hover {
  box-shadow: 0 0 10px #ccc;
}
</style>
