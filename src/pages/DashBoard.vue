<template>
  <q-page class="flex flex-center">
    <h1>DashBoard Page</h1>
    <!-- place QPageScroller at end of page -->
    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
    >
      <q-btn fab icon="keyboard_arrow_up" color="accent" />
    </q-page-scroller>
  </q-page>
</template>

<script setup>
defineOptions({
  name: "DashBoard",
});
</script>
