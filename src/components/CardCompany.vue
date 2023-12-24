<template>
  <q-card class="text-white" :style="{ 'background-image': background_image }">
    <q-card-section>
      <div class="text-h6 text-center text-capitalize">{{ data.name }}</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="text-h3 text-weight-bolder text-center">
        <q-icon name="apartment"></q-icon>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6 text-weight-bolder text-center">
        Servire como {{ data.name }}.
      </div>
    </q-card-section>
    <q-card-actions vertical align="center">
      <q-btn
        :disable="disabled"
        @click="selectItem(data)"
        class="text-capitalize bg-indigo-8"
      >
        Add
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { computed, defineEmits, defineProps } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => {},
  },
  background_image: {
    type: String,
    required: false,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["selectedItem"]);

const selectItem = async (data) => {
  emit("selectedItem", { name: data.name, id: data.id });
};
</script>
