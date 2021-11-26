<template>
  <project-add-form @add="onAdd"></project-add-form>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { INewProject, IProject } from './project';
  import ProjectAddForm from './project-add-form.vue';
  // import TodoList from './todo-list.vue';
  import { ProjectService, IProjectService } from './project-service';

  export default defineComponent({
    name: 'ProjectsView',
    components: {
      ProjectAddForm
      // TodoList
    },
    created() {
      this.projects = this.service.getAll();
    },
    computed: {
      service(): IProjectService {
        return new ProjectService();
      }
    },
    data() {
      return {
        projects: [] as IProject[]
      };
    },
    methods: {
      onAdd(newItem: INewProject) {
        const item = this.service.create(newItem);
        this.projects.push(item);
      }
    }
  });
</script>
