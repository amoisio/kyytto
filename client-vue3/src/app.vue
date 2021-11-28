<template>
  <div class="sidebar-placeholder">
    <side-bar></side-bar>
  </div>
  <div class="content-placeholder">
    <content-pane></content-pane>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import SideBar from './side-bar/side-bar.vue';
  import ContentPane from './content-pane.vue';
  export default defineComponent({
    components: {
      SideBar,
      ContentPane
    }
  });
</script>
<style lang="scss">
  @import './assets/globals.scss';
  @import './assets/baseStyles.scss';

  .sidebar-placeholder {
    position: absolute;
    top: $side-bar-top;
    left: $side-bar-left;
    height: 100%;
    width: $side-bar-width;
    background-color: $russian-violet;
  }

  .content-placeholder {
    position: relative;
    margin: $default-margin $default-margin $default-margin $default-margin+$side-bar-width;
    height: 100%;
  }
</style>
