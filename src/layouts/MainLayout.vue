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
              <img :src="showAvatar" />
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
import { computed, onMounted, onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useQuasar } from "quasar";
import linksList from "../sources/links";
import { useAuthStore } from "../store/auth";
import { useUsersStore } from "../store/users";

import { supabase } from "../boot/supabase";

import EssentialLink from "components/EssentialLink.vue";
import MessagesComponent from "src/components/MessagesComponent.vue";

// all Hook.
onBeforeMount(async () => {
  await authStore.getSessionUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session === null) {
    router.push("/login");
  }
  await getUserData();
});

// all definitions Actions store
const authStore = useAuthStore();
const usersStore = useUsersStore();
const router = useRouter();
const $q = useQuasar();

// all definitions state store
const { user, authUser } = storeToRefs(authStore);
const { roleAccessType } = storeToRefs(authStore);

// all const ref value
const leftDrawerOpen = ref(false);
const essentialLinks = linksList;

// all Methods
const getUserData = async () => {
  usersStore.fetchUsers();
};

const logout = async () => {
  await authStore.signOutUser();
  console.log("logged out");
  router.push("/login");
};

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const showAvatar = computed(() => {
  return (
    authUser.value?.user_metadata.avatar_url || "https://i.pravatar.cc/300"
  );
});

const showNavLinks = computed(() => {
  return roleAccessType;
});
</script>
