<template>
  <q-layout
    view="lHh Lpr lFf"
    style="
      background: rgb(2, 0, 36);
      background: linear-gradient(
        90deg,
        #000000 0%,
        #200e2d 38%,
        #23254a 600%,
        #1b4568 100%
      );
    "
  >
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> Sion Bands </q-toolbar-title>
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating> 5 </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <MessagesComponent />
                <q-card class="text-center no-shadow no-border">
                  <q-btn
                    label="View All"
                    style="max-width: 120px !important"
                    flat
                    dense
                    class="text-indigo-8"
                  ></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-btn>
          <!---->
          <q-btn
            class="q-mr-xs"
            flat
            round
            @click="$q.dark.toggle()"
            :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :link="link"
          :handleClick="logout"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import linksList from "../sources/links";
import { useAuthStore } from "../store/auth";
import { useUsersStore } from "../store/users";

import { supabase } from "../boot/supabase";

import EssentialLink from "components/EssentialLink.vue";
import MessagesComponent from "src/components/MessagesComponent.vue";
import { IS_ADMIN } from "src/sources/const";
onMounted(async () => {
  //await authStore.loadUser();
  await authStore.getSessionUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session === null) {
    router.push("/login");
  }
  await getUserData();
});
const authStore = useAuthStore();

const usersStore = useUsersStore();
const { roleAccessType } = storeToRefs(authStore);

const router = useRouter();
const leftDrawerOpen = ref(false);

const essentialLinks = linksList;
const $q = useQuasar();

const { user } = storeToRefs(authStore);

const getUserData = async () => {
  usersStore.fetchUsers();
};

const logout = async () => {
  await authStore.signOutUser();
  await router.push({ path: "/login" });
};

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const showNavLinks = computed(() => {
  return roleAccessType;
});
</script>
