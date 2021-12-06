<template>
  <div class="projects">
    <div class="row pb-3 pt-3">
      <div class="col-4">
        <h1>Projects</h1>
      </div>
      <div class="col-2 pull-right">
        <button 
          class="btn btn-primary" 
          @click="showCreateForm">New project</button>
      </div>
    </div>
    <template v-if="showList">
      <div class="row" v-for="project of projects" :key="project.href">
        <div class="col-12 col-md-6">
          <project-item :project="project" @edit="showEditForm(project)"> </project-item>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="row">
        <div class="col-12 col-md-6">
          <project-details :project="current" @save="save" @remove="remove" @cancel="resetView"> </project-details>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { IProject } from './project';
  import ProjectDetails from './project-details.vue';
  import ProjectItem from './project-item.vue';
  import { ProjectService, IProjectService } from './project-service';

  interface IProjectsViewModel {
    current?: IProject;
    projects: IProject[];
    showList: boolean;
  }

  export default defineComponent({
    name: 'ProjectsView',
    components: {
      ProjectDetails,
      ProjectItem
    },
    created() {
      this.projects = this.service.getAll();
    },
    computed: {
      service(): IProjectService {
        return new ProjectService();
      },
      isNew(): boolean {
        return this.current === undefined;
      }
    },
    data() {
      return {
        current: undefined,
        projects: [],
        showList: true
      } as IProjectsViewModel;
    },
    methods: {
      showCreateForm() {
        this.showList = false;
      },
      showEditForm(project: IProject) {
        this.current = project;
        this.showList = false;
      },
      save(project: IProject) {
        if (this.isNew) {
          this.service.create(project);
        } else {
          this.service.update(project);
        }
        this.projects = this.service.getAll();
        this.resetView();
      },
      remove(project: IProject) {
        this.service.remove(project);
        this.projects = this.service.getAll();
        this.resetView();
      },
      resetView() {
        this.current = undefined;
        this.showList = true;
      }
    }
  });
</script>
<style lang="scss">
  @use 'projects';
</style>
