<template>
  <div class="q-pa-md bg-white" style="max-width: 400px">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      ref="formMusician"
    >
      <q-input
        filled
        v-model="formData.first_name"
        label="First Name *"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please enter a first name',
        ]"
      />

      <q-input
        filled
        v-model="formData.last_name"
        label="Last Name *"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please enter a last name',
        ]"
      />

      <q-input
        filled
        type="email"
        v-model="formData.email"
        label="Email *"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please enter a email address',
        ]"
      />

      <!-- <q-input
        filled
        type="tel"
        v-model="formData.phone_number"
        label="Phone Number"
        hint="Enter your phone number"
      /> -->

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";

const authStore = useAuthStore();

const formData = ref({
  last_name: "",
  first_name: "",
  phone_number: "",
  email: "",
  role: "",
});

const process = process.env.NODE_ENV;
const roleOptions = [
  {
    label: "Musician",
    value: 1,
  },
  {
    label: "Director",
    value: 2,
  },
];

const onSubmit = async () => {
  // Construct the user object

  const user = {
    first_name: formData.value.first_name,
    last_name: formData.value.last_name,
    // phone_number: formData.value.phone_number,
    // role_id: formData.value.role.value,
    email: formData.value.email,
    // Add other fields
  };

  const res = await authStore.sendInvitationEmail(user);
  console.log(res);
};

const onReset = async () => {
  // // Reset our form
  formData.value.first_name = "";
  formData.value.last_name = "";
  // formData.value.phone_number = "";
  // formData.value.role = "";
  formData.value.email = "";
};
</script>
