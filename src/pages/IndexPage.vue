<template>
  <q-page class="q-pa-md">
    <MusiciansTable />
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { supabase } from "../boot/supabase";
import { useUsersStore } from "../store/users";

import { useAuthStore } from "../store/auth";

import MusiciansTable from "../components/MusiciansTable.vue";

const router = useRouter();
const usersStore = useUsersStore();

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.loadUserTable();
  const { data: session } = await supabase.auth.getSession();
});
</script>
