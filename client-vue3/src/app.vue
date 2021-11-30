<template>
  <div class="menu-layout-container">
    <menu-view></menu-view>
  </div>
  <div class="content-layout-container">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import MenuView from './menu/menu-view.vue';
  export default defineComponent({
    components: {
      MenuView
    }
  });
</script>
<style lang="scss">
  @use 'app';
</style>
