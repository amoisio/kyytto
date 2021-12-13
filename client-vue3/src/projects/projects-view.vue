<template>
  <div class="projects">
    <div class="row pb-3 pt-3">
      <div class="col-auto">
        <h1>Projects</h1>
      </div>
      <div class="col align-self-center">
        <button id="new-project" class="btn btn-outline-primary" @click="navigateToProjectForm()">
          <b-icon icon="tag" size="2x"></b-icon>
          <span class="fs-5">New project</span>
        </button>
      </div>
    </div>
    <div class="row" v-for="project of projects" :key="project.href">
      <div class="col-12 col-md-6">
        <project-item :project="project" @edit="navigateToProjectForm(project)"></project-item>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { IProject } from './project-models';
  import ProjectItem from './project-item.vue';
  import { parse } from '@/lib/hrefParser';

  export default defineComponent({
    name: 'ProjectsView',
    components: {
      ProjectItem
    },
    created() {
      this.projects = this.$services.projectService.getAll();
    },
    data() {
      return {
        projects: [] as IProject[]
      };
    },
    methods: {
      navigateToProjectForm(project?: IProject) {
        const id = project
          ? parse(project.href).id
          : '0';
        this.$router.push({ name: 'project-form', params: { id: id } });
      }
    }
  });
</script>
<style lang="scss">
  #new-project .bootstrap-icon {
    margin-right: 8px !important;
  }
</style>
