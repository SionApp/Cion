<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274c5, #5a4a9f)"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 300px">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">Registration</h4>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl q-pb-md">
              <q-input
                square
                clearable
                v-model="email"
                type="email"
                label="Email"
              >
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="username"
                type="username"
                label="Username"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input
                square
                clearable
                v-model="password"
                type="password"
                label="Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn
              @click="registerWithPassword"
              unelevated
              size="lg"
              color="purple-4"
              class="full-width text-white"
              label="Get Started"
              :disabled="loading"
            />
          </q-card-actions>
          <q-card-section class="text-center">
            <div class="q-pa-md q-gutter-sm">
              <q-btn flat label="Return to Login" to="/login" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../boot/supabase";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();
const loading = ref(false);
const router = useRouter();

const email = ref("");
const password = ref("");
const username = ref("");

const registerWithPassword = async (event) => {
  event.preventDefault();
  loading.value = true;
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) {
      throw new Error(error.message);
    }
    $q.notify({
      color: "positive",
      message: "Registration successful",
      position: "right",
    });
    router.push("/");
  } catch (error) {
    $q.notify({
      color: "negative",
      message: error.message,
      position: "top",
    });
    throw new Error(error.message);
  }
  loading.value = false;
};

async function signInWithMagicLink() {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: "example@email.com",
    options: {
      emailRedirectTo: "localhost:9000/", // Url in production!
    },
  });
}
</script>
