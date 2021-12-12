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
  import { defineComponent, provide } from 'vue';
  import { ITask } from './board/task-models';
  import { TaskService } from './board/task-service';
  import { LocalStorageRepository } from './irepository';
  import MenuView from './menu/menu-view.vue';
  import { IProject } from './projects/project-models';
  import { ProjectService } from './projects/project-service';
  export default defineComponent({
    components: {
      MenuView
    },
    setup() {
      provide('projectService', new ProjectService(new LocalStorageRepository<IProject>('projects')));
      provide('taskService', new TaskService(new LocalStorageRepository<ITask>('tasks')));
    }
  });
</script>
<style lang="scss">
  @use 'app';
</style>
