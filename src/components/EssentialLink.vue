<template>
  <q-item clickable tag="a" @click="handleClick">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="link.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ link.title }}</q-item-label>
      <q-item-label caption>{{ link.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: "",
  },

  link: {
    type: Object,
    default: () => {},
    required: true,
  },

  icon: {
    type: String,
    default: "",
  },
  handleClick: {
    type: Function,
  },
});
const handleClick = () => {
  if (props.link.identifier === "logout") {
    props.handleClick();
  } else {
    router.push({ name: props.link.route });
  }
};
</script>
