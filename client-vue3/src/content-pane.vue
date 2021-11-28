<template>
  <router-view class="content-pane"></router-view>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'ContentPane'
  });
</script>
<style lang="scss">
  @import './assets/globals.scss';
  @import './assets/baseStyles.scss';
</style>
