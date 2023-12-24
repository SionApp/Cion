<template>
  <div class="text-h6 q-ma-md">{{ props.title }}</div>
  <q-separator />
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
