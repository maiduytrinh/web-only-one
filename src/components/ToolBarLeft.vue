<template>
  <q-drawer
    class="bg-brand text-white"
    v-model="isLeftDrawerOpen"
    show-if-above
    bordered
    :width="250"
  >
    <q-list dark>
      <q-img src="../assets/material.png" style="height: 100px">
        <div class="bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </div>
      </q-img>

      <template v-for="(menuItem, index) in menuList" :key="index">
        <q-item
          clickable
          v-ripple
          :to="menuItem.link"
          active-class="my-menu-link"
        >
          <q-item-section avatar>
            <q-icon :name="menuItem.icon" />
          </q-item-section>
          <q-item-section>
            {{ menuItem.label }}
          </q-item-section>
        </q-item>
        <q-separator :key="'sep' + index" v-if="menuItem.separator" />
      </template>
    </q-list>
  </q-drawer>
</template>

<script setup>
import { computed } from "vue";

const isLeftDrawerOpen = computed(() => props.leftDrawerOpen);

const props = defineProps({
  menuList: {
    type: Object,
    required: true,
  },
  leftDrawerOpen: {
    type: Boolean,
    default: true,
  },
});
</script>
