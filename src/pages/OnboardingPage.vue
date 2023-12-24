<template>
  <q-page class="q-pa-sm">
    <q-page-container>
      <section style="min-height: 25vh" class="flex text-white flex-center">
        <div style="position: relative">
          <div class="text-h4 text-center">
            Es momento de completar tu Perfil
          </div>
          <div class="text-subtitle2 q-pt-sm text-center">
            Completa tu Perfil con tu datos correctos.
          </div>
        </div>
      </section>
    </q-page-container>
    <div class="row q-col-gutter-sm bg-transparent">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <StepperComponentOnboarding />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import StepperComponentOnboarding from "src/components/StepperComponentOnboarding.vue";
</script>
