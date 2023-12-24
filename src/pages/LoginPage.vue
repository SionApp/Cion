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
            <div class="col-md-6 col-xs-12">
              <div class="q-pa-md">
                <div class="text-h6 text-white text-center text-weight-bolder">
                  Bienvenido
                </div>
                <div class="row justify-center q-pa-md q-mb-sm">
                  <q-btn size="25px" round @click="loginWithGoogle">
                    <q-img src="~assets/google-icon.png" />
                  </q-btn>
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
                  <q-input
                    dark
                    color="white"
                    filled
                    type="password"
                    v-model="password"
                    label="Password"
                    label-color="white"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val !== null && val !== '') ||
                        'Please type your password',
                    ]"
                  >
                    <template v-slot:prepend>
                      <q-icon color="white" name="key" />
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
            <div class="col-md-6 col-xs-12 q-pa-md desktop-only">
              <q-img
                placeholder-src="~assets/logotipo.svg"
                src="~assets/logo2.png"
              ></q-img>
              <!--div class="row justify-center">
                <q-btn
                  size="lg"
                  label="Registrate"
                  type="submit"
                  color="red"
                  rounded
                  @click="redirectToRegister()"
                />
              </div-->
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { supabase } from "../boot/supabase";

const router = useRouter();

const loginWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
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

const onSubmit = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) throw error;
  router.push("/");
};

const forgotPassword = () => {
  console.log("click forgot password");
};
</script>
