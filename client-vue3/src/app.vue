<template>
  <div class="sidebar">
    <!-- [links]="links" *ngIf="links" -->
    <side-bar></side-bar>
  </div>
  <div class="content">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './side-bar/side-bar.vue';
import { TodoService } from './todos/todo-service';
export default defineComponent({
  components: {
    SideBar
  },
  provide: {
    todoService: new TodoService()
  }
});
</script>
<style scoped>
  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 75px;
    background-color: #006666;
    color: white;
    font-weight: 600;
  }

  .sidebar img {
    margin: 0 16px;
  }

  .content {
    position: relative;
    margin-left: 75px;
    padding: 0px;
    width: 300px;
    height: 100%;
    color: white;
    font-weight: 600;
  }
</style>
