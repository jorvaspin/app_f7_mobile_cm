<template>
  <f7-page name="lessons-groups-page" no-toolbar class="page-lessons">
    <f7-navbar no-shadow class="navbar-lessons lessons-groups">
      <template #left>
        <f7-link
          icon-size="18"
          icon="fa-regular fa-chevron-left"
          back

          class="z-10 flex items-center justify-center mx-auto"
          >Biblioteca
        </f7-link>
      </template>
    </f7-navbar>
    <div
      class="fixed inset-x-0 bottom-0 z-50 h-16 bg-gradient-to-t from-white dark:from-dark"
    ></div>
    <div class="py-1 bg-stone-700">
      <f7-block-title class="mb-4 text-2xl leading-none text-white font-display">
        {{ groupData.nombre }}
      </f7-block-title>

      <f7-block>
        <div class="relative w-full overflow-hidden rounded h-26 md:h-48">
          <div class="absolute inset-0">
            <img
              class="object-cover object-center w-full h-full"
              loading="lazy"
              :src="groupData.app_banner"
              :alt="groupData.nombre"
            />
            <div class="absolute inset-0 bg-gray-200 mix-blend-multiply"></div>
          </div>
        </div>
        <p class="mt-3 leading-tight text-white">
          {{ groupData.description }}
        </p>
      </f7-block>
    </div>
    <f7-block>
      <!-- Current page: {{ groupData.lessons.current_page }} -->
      <div class="space-y-3 md:grid-cols-2 md:grid md:space-y-0 md:gap-2 lg:grid-cols-3">
        <div v-for="lesson in groupData.lessons.data" v-bind:key="lesson.id">
          <tematica-web-card-small
            :number-mini="true"
            :tematica="lesson"
            :page="page"
            :sectionName="sectionName"
          ></tematica-web-card-small>
        </div>
      </div>
    </f7-block>
  </f7-page>
</template>
<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";
import { TematicaWebCardSmall } from "@components/GlobalComponents";
import { useStore } from "@/store/store";
import { find } from "lodash";

export default defineComponent({
  name: "page-lessons-kanban",
  props: {
    backText: {
      type: String,
      require: false,
      default: "Atrás",
    },
    page: { type: String, required: false, default: "biblioteca" },
    sectionName: { type: String, required: false, default: "Biblioteca" },
    f7route: Object,
    f7router: Object,
  },
  setup(props) {
    const store = useStore();
    const groupId = props.f7route?.params.id;
    var groupsLessons = store.getters.listLessonsGroups.groups;
    return {
      groupData: computed(() =>
        find(groupsLessons, function (group: { id: number }) {
          return group.id == groupId;
        })
      ),
    };
  },
  components: {
    TematicaWebCardSmall,
  },
});
</script>
