<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

import { useRolesStore } from "../store/roles";
import { useUsersStore } from "../store/users";
import { useAuthStore } from "../store/auth";
import { useInstrumentsStore } from "../store/instruments";
import CardCompany from "src/components/CardCompany.vue";
import useNotify from "../composables/useNotify";
import generatePassword from "src/helpers";

onBeforeMount(async () => {
  await getRoles();
  await getInstrumentsData();
  await validateUserForInvitation();
});

// all definitions Actions store
const rolesStore = useRolesStore();
const usersStore = useUsersStore();
const instrumentsStore = useInstrumentsStore();
const authStore = useAuthStore();
const notify = useNotify();
const router = useRouter();
const route = useRoute();

const { roles } = storeToRefs(rolesStore);
const { instruments } = storeToRefs(instrumentsStore);

// All const reactive
const step = ref(1);
const personal_details = reactive({});
const background_img1 = ref(
  "linear-gradient(to top, #30cfd0 0%, #330867 100%)",
);
const background_img2 = ref("linear-gradient(to top, #30cfd0 0%, #330867 30%)");
const loading = ref(false);
const selectedInstrument = ref([]);
const roleRef = ref(null);
const userId = ref(null);
const emailRefInvitation = ref(null);

// All Methods
const getRoles = async () => {
  await rolesStore.loadRoles();
};
const getInstrumentsData = async () => {
  await instrumentsStore.getInstruments();
};
const handleSelectedRole = async (select) => {
  roleRef.value = select;
};

const handleSelectedInstrument = async (instrument) => {
  if (!selectedInstrument.value.some((item) => item.id === instrument.id)) {
    selectedInstrument.value.push(instrument);
  }
};

const isSelected = (instrument) => {
  return (
    Array.isArray(selectedInstrument.value) &&
    selectedInstrument.value.includes(instrument)
  );
};

// first we validate the invitation assign the same email.
const validateUserForInvitation = async () => {
  const { token } = route.query;
  const res = await authStore.validateInvitationToken(token);
  emailRefInvitation.value = res.email;
};
// now we create a new user and by default
const signUpUser = async (userData) => {
  try {
    const userLogged = await authStore.signUp(userData);
    const {
      data: { session, user },
      error,
    } = userLogged;

    if (error) {
      return null;
    }

    return { session, user };
  } catch (error) {
    throw error;
  }
};
// Send Data to store and we will create the same user in our user table.
const createUser = async (data) => {
  try {
    return await usersStore.createUser(data);
  } catch (error) {
    throw new Error("Error:", error);
  }
};

// We assign the instruments for each user
const assignInstruments = async (instrumentsSelected, userId) => {
  const instruments_payloads = instrumentsSelected.map((instrumentId) => ({
    user_id: userId,
    instrument_id: instrumentId,
  }));
  try {
    return await instrumentsStore.assignInstruments(instruments_payloads);
  } catch (error) {
    throw new Error("Error:", error);
  }
};
// If everything goes well, we delete the invitations after resolving it!
const deleteInvitation = async (token) => {
  const { error } = await authStore.deleteInvitation(token);
  if (error) throw error;
};

// Here we prepare all the process data for the user!
const handleCreateProfile = async () => {
  try {
    loading.value = true;

    const password = generatePassword();
    const payload_user = {
      ...personal_details,
      email: emailRefInvitation.value,
      password,
    };
    const res = await signUpUser(payload_user);
    if (res === null) {
      return;
    }

    const dataParse = {
      ...personal_details,
      auth_id: res.user.id,
      role_id: roleRef.value.id,
    };

    const [createUserResult] = await createUser(dataParse);

    const [assignInstrumentsResult] = await Promise.all([
      assignInstruments(
        selectedInstrument.value.map((item) => item.id),
        userId.value,
      ),
    ]);
    notify.notifySuccess("Profile Completed");
  } catch (error) {
    notify.notifyError("An error occurred:", error.message);

    throw new Error(error);
  } finally {
    const { token } = route.query;
    await deleteInvitation(token);
    loading.value = false;
    router.push("/profile");
  }
};
</script>

<template>
  <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>
    <q-step
      :name="1"
      title="Information Personal"
      icon="fa-solid fa-address-card"
      done-color="deep-orange"
      active-color="purple"
      :done="step > 1"
      :header-nav="step > 1"
    >
      <div class="row">
        <div class="col-6">
          <q-item>
            <q-input
              dense
              outlined
              class="full-width"
              v-model="personal_details.first_name"
              label="First Name *"
            />
          </q-item>
        </div>
        <div class="col-6">
          <q-item>
            <q-input
              dense
              outlined
              class="full-width"
              v-model="personal_details.last_name"
              label="Last Name *"
            />
          </q-item>
        </div>
        <div class="col-12">
          <q-item>
            <q-input
              dense
              autogrow
              outlined
              v-model="personal_details.address_line_1"
              class="full-width"
              label="Address line*"
            />
          </q-item>
        </div>
        <div class="col-12">
          <q-item>
            <q-input
              dense
              autogrow
              outlined
              v-model="personal_details.address_line_2"
              class="full-width"
              label="Address line alternative*"
            />
          </q-item>
        </div>
        <div class="col-6">
          <q-item>
            <q-input
              dense
              outlined
              class="full-width"
              v-model="personal_details.phone_number"
              label="Phone Number 1"
            />
          </q-item>
        </div>

        <div class="col-6">
          <q-item>
            <q-input
              dense
              outlined
              class="full-width"
              v-model="personal_details.phone_number_2"
              label="Phone Number 2"
            />
          </q-item>
        </div>
      </div>

      <q-stepper-navigation>
        <q-btn
          rounded
          @click="
            () => {
              done1 = true;
              step = 2;
            }
          "
          class="float-right q-mr-md q-mb-md"
          color="blue"
          label="Next"
        />
      </q-stepper-navigation>
    </q-step>

    <q-step
      :name="2"
      title="Select yours Instruments"
      icon="fa-solid fa-music"
      :done="step > 2"
      :header-nav="step > 2"
    >
      <!-- Send Role -->
      <div class="row">
        <div class="col-6" v-for="role in roles" :key="role.id">
          <div class="q-gutter-xs q-pa-md">
            <card-company
              class="q-mt-lg q-mr-sm"
              :background_image="background_img1"
              :data="role"
              @selected-item="handleSelectedRole"
            />
          </div>
        </div>
      </div>
      <!--Send Instrument-->
      <q-separator class="q-ma-md" />
      <div class="row">
        <div
          class="col-6"
          v-for="instrument in instruments"
          :key="instrument.id"
        >
          <div class="q-gutter-xs q-pa-md">
            <card-company
              class="q-mt-lg q-mr-sm"
              :background_image="background_img2"
              :data="instrument"
              @selected-item="handleSelectedInstrument"
              :disabled="isSelected(instrument)"
            />
          </div>
        </div>
      </div>

      <q-stepper-navigation>
        <q-btn
          rounded
          @click="
            () => {
              done2 = true;
              step = 3;
            }
          "
          class="float-right q-mr-md q-mb-md"
          color="blue"
          label="Next"
        />
        <q-btn
          flat
          @click="step = 1"
          color="primary"
          rounded
          label="Back"
          class="q-mr-sm float-right"
        />
      </q-stepper-navigation>
    </q-step>

    <q-step
      :name="3"
      title="Review your Details"
      icon="fa-solid fa-user-check"
      :header-nav="step > 3"
    >
      <div class="row">
        <div class="col-12">
          <q-item-label header class="text-h6">Profile Details</q-item-label>
          <q-item class="full-width">
            <q-item-section>
              <q-item-label lines="1">Firs Name</q-item-label>
              <q-item-label caption>{{
                personal_details.first_name
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator></q-separator>
          <q-item class="full-width">
            <q-item-section>
              <q-item-label lines="1">Last Name</q-item-label>
              <q-item-label caption>{{
                personal_details.last_name
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator></q-separator>
          <q-item class="full-width">
            <q-item-section>
              <q-item-label lines="1">Address Line 1</q-item-label>
              <q-item-label caption>{{
                personal_details.address_line_1
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator></q-separator>
          <q-item class="full-width">
            <q-item-section>
              <q-item-label lines="1">Address Line Alternative</q-item-label>
              <q-item-label caption>{{
                personal_details.address_line_2
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator></q-separator>
        </div>
      </div>

      <q-card class="rounded-borders">
        <q-card-section horizontal>
          <q-card-section class="col-5 q-pt-xs text-capitalize">
            <div class="text-h6 text-center">Role</div>
            <div class="text-subtitle1">
              {{
                personal_details.first_name + " " + personal_details.last_name
              }}
            </div>
            <div class="text-subtitle2">{{ roleRef ? roleRef.name : "" }}</div>
          </q-card-section>
          <q-card-section class="col-7 q-pt-xs">
            <div class="text-h6 text-center">Instruments</div>
            <div class="text-subtitle1 q-mb-xs text-capitalize">
              <div
                v-for="instrument in selectedInstrument"
                :key="instrument.id"
              >
                {{ instrument.name }}
              </div>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>

      <q-stepper-navigation>
        <q-btn
          rounded
          @click="handleCreateProfile()"
          class="float-right q-mr-md q-mb-md"
          color="blue"
          label="Save Profile"
        />
        <q-btn
          flat
          @click="step = 2"
          color="primary"
          rounded
          label="Back"
          class="q-mr-sm float-right"
        />
      </q-stepper-navigation>
    </q-step>
  </q-stepper>
</template>
