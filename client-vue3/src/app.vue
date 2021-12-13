<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col menu-container gx-0">
        <menu-view class="min-vh-100"></menu-view>
      </div>
      <div class="col">
        <router-view></router-view>
      </div>
    </div>
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
