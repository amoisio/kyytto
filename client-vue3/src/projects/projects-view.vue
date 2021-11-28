<template>
  <button class="new-project-button" @click="showAddNewForm" v-if="!showForm">New Project</button>
  <project-add-form v-else @add="onAdd"></project-add-form>
  <project-item v-for="project of projects" :project="project" :key="project.href" @remove="onRemove"></project-item>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { INewProject, IProject } from './project';
  import ProjectAddForm from './project-add-form.vue';
  import ProjectItem from './project-item.vue';
  import { ProjectService, IProjectService } from './project-service';

  export default defineComponent({
    name: 'ProjectsView',
    components: {
      ProjectAddForm,
      ProjectItem
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
        projects: [] as IProject[],
        showForm: false
      };
    },
    methods: {
      onAdd(newItem: INewProject) {
        this.service.create(newItem);
        this.projects = this.service.getAll();
        this.showForm = false;
      },
      onRemove(item: IProject) {
        this.service.remove(item);
        this.projects = this.service.getAll();
      },
      showAddNewForm() {
        this.showForm = true;
      }
    }
  });
</script>
<style lang="scss">

</style>
