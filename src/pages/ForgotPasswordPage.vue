<template>
  <q-page padding class="row items-center justify-between">
    <div class="row full-width">
      <div class="col-md-9 offset-md-2 col-xs-12 q-pl-md q-pr-md q-pt-sm">
        <q-card flat class="text-white bg-transparent">
          <div class="row justify-between">
            <div class="col-md-6 col-xs-12 mobile-only">
              <div class="row justify-center q-ma-md">
                <q-img
                  placeholder-src="~assets/logotipo.svg"
                  src="~assets/logo2.png"
                  width="40%"
                ></q-img>
              </div>
            </div>
            <div class="col-md-6 col-xs-12 q-pa-md desktop-only">
              <q-img
                placeholder-src="~assets/logotipo.svg"
                src="~assets/logo2.png"
              ></q-img>
            </div>
            <div class="col-md-6 col-xs-12">
              <div class="q-pa-md">
                <div
                  class="text-h6 q-pa-lg text-white text-center text-weight-bolder"
                >
                  Recupera tu contrasena
                </div>

                <q-form @submit="onSubmit" class="q-gutter-md">
                  <q-input
                    dark
                    color="white"
                    filled
                    v-model="email"
                    label="Email"
                    label-color="white"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Please type Username',
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon color="white" name="email" />
                    </template>
                  </q-input>
                  <div class="fit row wrap justify-center">
                    <q-btn
                      unelevated
                      rounded
                      color="grey-10 text-capitalize"
                      label="¿Olvidastes tu contrasena?"
                      @click="forgotPassword()"
                    />
                  </div>
                  <div class="fit row wrap justify-center">
                    <q-btn
                      size="lg"
                      label="Iniciar"
                      type="submit"
                      color="red"
                      rounded
                    />
                  </div>
                </q-form>
              </div>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

import { supabase } from "../boot/supabase";
import { useAuthStore } from "../store/auth";

const router = useRouter();

const $q = useQuasar();

const loginWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:9000",
    },
  });
  if (error) {
    throw error;
  }
};

const email = ref(null);
const password = ref(null);

const redirectToRegister = () => {
  router.push("/register");
};

const onSubmit = () => {
  console.log("click submit");
  const { error } = supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) throw error;
};

const forgotPassword = () => {
  console.log("click forgot password");
};
</script>
