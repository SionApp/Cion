<template>
  <div class="q-pa-md">
    <q-stepper v-model="step" ref="stepper" color="primary" animated>
      <q-step
        :name="1"
        title="Set Basic details"
        icon="settings"
        :done="step > 1"
      >
        <div class="row">
          <div class="col-6">
            <q-item>
              <q-input
                dense
                rounded
                autogrow
                outlined
                class="full-width rounded-full"
                label="Nombre del evento *"
                v-model="church_event.name"
              />
            </q-item>
          </div>

          <div class="col-6">
            <q-item>
              <q-input
                dense
                autogrow
                outlined
                rounded
                class="full-width"
                label="Sitio *"
                v-model="church_event.site"
              />
            </q-item>
          </div>
          <div class="col-6">
            <q-item>
              <q-input
                dense
                rounded
                autogrow
                outlined
                class="full-width"
                label="Description"
                v-model="church_event.description"
              />
            </q-item>
          </div>
          <div class="col-6">
            <q-item>
              <q-input
                dense
                autogrow
                rounded
                outlined
                class="full-width"
                label="Duracion"
                v-model="church_event.duration"
              />
            </q-item>
          </div>
          <div class="col-6">
            <div class="q-pa-md full-width">
              <div class="q-gutter-md">
                <q-select
                  rounded
                  dense
                  outlined
                  v-model="church_event.state"
                  :options="church_event_states"
                  label="Estado del evento"
                />
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="q-pa-md full-width">
              <q-input rounded outlined dense v-model="formattedString">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="formattedString" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>

                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time
                        v-model="formattedString"
                        mask="YYYY-MM-DD HH:mm"
                        format24h
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
      </q-step>

      <q-step
        :name="2"
        title="Create Band and practices"
        caption="Optional"
        icon="create_new_folder"
        :done="step > 2"
      >
        <q-card class="q-mt-sm">
          <q-card-section class="text-h6 q-pb-none">
            <q-item>
              <q-item-section avatar class="">
                <q-icon color="blue" name="fa-solid fa-icons" size="24px" />
              </q-item-section>

              <q-item-section>
                <q-toggle
                  v-model="church_event.rehearsal"
                  label="Programar Ensayo"
                />
              </q-item-section>
            </q-item>

            <div class="row">
              <div class="col-6" v-show="handle_rehearsal">
                <q-item-section>
                  <q-item-label>
                    <div class="text-h6 q-py-md">Fecha de ensayo.</div>
                  </q-item-label>
                </q-item-section>
                <div class="q-pa-md" style="max-width: 500px">
                  <q-input
                    filled
                    v-model="formattedString"
                    mask="date"
                    :rules="['date']"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="formattedString">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <div class="q-mt-sm">
          <LoadEventComponent :roles="roles" />
        </div>
      </q-step>

      <q-step :name="3" title="Create an ad" icon="add_comment">
        <q-card class="q-mt-sm">
          <q-card-section class="text-h6 q-pb-none">
            <q-item>
              <q-item-section avatar class="">
                <q-icon color="blue" name="fas fa-chart-line" size="44px" />
              </q-item-section>

              <q-item-section>
                <div class="text-h6">Product Sales Stats</div>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <div class="flex justify-end">
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="$refs.stepper.previous()"
              label="Back"
              class="q-mr-md"
            />
            <q-btn
              @click="$refs.stepper.next()"
              color="primary"
              :label="step === 3 ? 'Finish' : 'Continue'"
            />
          </div>
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script setup>
import { date } from "quasar";

import { computed, reactive, ref, onMounted } from "vue";
import SelectMultiple from "../components/SelectMultiple.vue";
import LoadEventComponent from "../components/LoadEventComponent.vue";
import { useRolesStore } from "../store/roles";

const rolesStore = useRolesStore();

onMounted(() => {
  rolesStore.loadRoles();
});

const roles = computed(() => {
  return rolesStore.roles ? rolesStore.roles.map((role) => role) : [];
});

const step = ref(1);

const church_event_states = [
  "Planificado",
  "En curso",
  "Finalizado",
  "Cancelado",
];

const timeStamp = Date.now();

const formattedString = ref(date.formatDate(timeStamp, "DD-MM-YYYY"));

const church_event = reactive({
  rehearsal: false,
});
// crea una funcion que me traiga los musicos con los roles desde supabase
const handle_rehearsal = computed(() => church_event.rehearsal);
</script>
