<template>
  <div class="sidebar">
    <side-bar></side-bar>
  </div>
  <div class="content">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import SideBar from './side-bar/side-bar.vue';
  // import { TodoService } from './todos/todo-service';
  export default defineComponent({
    components: {
      SideBar
    },
    provide: {
      // todoService: new TodoService()
    }
  });
</script>
<style lang="scss">
  @import './assets/globals.scss';
  @import './assets/baseStyles.scss';

  .sidebar {
    position: absolute;
    top: $side-bar-top;
    left: $side-bar-left;
    height: 100%;
    width: $side-bar-width;
    background-color: $russian-violet;
  }

  .content {
    position: relative;
    margin: $default-margin $default-margin $default-margin $default-margin+$side-bar-width;
    height: 100%;
  }
</style>
