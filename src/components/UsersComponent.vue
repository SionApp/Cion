<template>
  <div>
    <h1>Usuarios Registrados</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../boot/supabase";

const users = ref([]);

const fetchUsers = async () => {
  const { data } = await supabase.from("users").select("id, email");
  users.value = data;
};

onMounted(fetchUsers);
</script>
