<template>
  <div>
    <div class="mt-2">
      <button
        type="button"
        class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-3 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
        @click="toggleListbox"
      >
        <span v-if="selectedPerson.avatar !== ''" class="flex items-center">
          <img
            :src="selectedPerson.avatar"
            alt=""
            class="h-5 w-5 flex-shrink-0 rounded-full"
          />
          <span class="ml-3 block truncate">{{ selectedPerson.name }}</span>
        </span>
        <span
          v-else
          class="h-5 w-5 rounded-full bg-gray-400 flex items-center justify-center"
        >
          <svg
            class="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z"
            />
          </svg>
        </span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <svg
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.707l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414-1.414L10 12.293 6.707 8.707z"
                clip-rule="evenodd"
              />
            </svg>

            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414L12.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 13.586l-2.293 2.293a1 1 0 01-1.414-1.414L8 12.586 5.707 10a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </svg>
        </span>
      </button>

      <ul
        v-if="isListboxOpen"
        class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        tabindex="-1"
        role="listbox"
        aria-labelledby="listbox-label"
        aria-activedescendant="listbox-option-{{ selectedIndex.value }}"
        @blur="closeListbox"
      >
        <li
          v-for="(person, index) in people"
          :key="person.id"
          :class="[
            index === selectedIndex.value
              ? 'bg-indigo-600 text-white'
              : 'text-gray-900',
            'relative cursor-default select-none py-2 pl-3 pr-9',
          ]"
          role="option"
          :id="`listbox-option-${index}`"
          @click="selectPerson(person, index)"
        >
          <div class="flex items-center">
            <img
              :src="person.avatar"
              alt=""
              class="h-5 w-5 flex-shrink-0 rounded-full"
            />
            <span
              :class="[
                index === selectedIndex.value ? 'font-semibold' : 'font-normal',
                'ml-3 block truncate',
              ]"
              >{{ person.name }}</span
            >
          </div>

          <span
            v-if="index === selectedIndex.value"
            class="absolute inset-y-0 right-0 flex items-center pr-4"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <!-- Your SVG path for the checkmark icon -->
            </svg>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isListboxOpen = ref(false);
const selectedIndex = ref(3); // Default selected index
const selectedPerson = ref({ id: 0, name: "", avatar: "" });
const selectPersonAvatar = ref(""); // Default values

const people = [
  // Your array of people
  {
    id: 1,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    id: 4,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 5,
    name: "Tanya Fox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 7,
    name: "Caroline Schultz",
    avatar:
      "https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 8,
    name: "Mason Heaney",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 9,
    name: "Claudie Smitham",
    avatar:
      "https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 10,
    name: "Emil Schaefer",
    avatar:
      "https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const toggleListbox = () => {
  isListboxOpen.value = !isListboxOpen.value;
};

const closeListbox = () => {
  isListboxOpen.value = false;
};

const selectPerson = (person, index) => {
  selectedPerson.value = person;
  selectPersonAvatar.value = person.avatar;
  selectedIndex.value = index;
  closeListbox();
  console.log(selectedPerson.value.avatar);
};
</script>
