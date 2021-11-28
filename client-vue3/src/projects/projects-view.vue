<template>
  <div class="projects-view">
    <project-list :projects="projects" @new="showCreateForm" @edit="showEditForm" v-if="showList"></project-list>
    <project-details v-else :project="current" @save="save" @remove="remove" @cancel="resetView"></project-details>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { IProject } from './project';
  import ProjectDetails from './project-details.vue';
  import ProjectList from './project-list.vue';
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
      ProjectList
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
  @import '@/assets/baseStyles.scss';
  .projects-view {
    width: 300px;
  }
</style>
