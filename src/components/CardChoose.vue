<template>
  <q-card
    class="my-card bg-purple text-white"
    :class="{ 'role-card-hover': hovered }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <q-item v-show="icon">
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>Title</q-item-label>
        <q-item-label caption>Subhead</q-item-label>
      </q-item-section>
    </q-item>
    <q-card-section>
      <div class="text-h6">{{ capitalizeFirstLatter(data.name) }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { defineProps, ref } from "vue";
import capitalizeFirstLatter from "../helpers/capitalizeFirstLatter.js";

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
    required: true,
  },
  icon: {
    type: String,
    default: null,
  },
});

const hovered = ref(false);
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 450px;
}
</style>
