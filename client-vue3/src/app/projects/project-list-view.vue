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
    <div class="row" v-for="project of projects" :key="project.id">
      <div class="col-12 col-md-6">
        <project-item :project="project" @edit="navigateToProjectForm(project)"></project-item>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Project } from './project-models';
  import ProjectItem from './project-item.vue';
  import { NotificationService } from '@/shared/notification-service';
  import { Identifier } from 'kyytto-models';

  export default defineComponent({
    name: 'ProjectListView',
    components: {
      ProjectItem
    },
    async created() {
      try {
        this.projects = await this.$services.projectService.getAll();
      } catch (e) {
        this.notificationService.notifyError(`Loading projects failed.`, 'Error', e); 
      }
    },
    data() {
      return {
        projects: [] as Project[]
      };
    },
    computed: {
      notificationService(): NotificationService {
        return this.$services.notificationService;
      }
    },
    methods: {
      async navigateToProjectForm(project?: Project): Promise<void> {
        const id = project?.id ?? Identifier.nil;
        await this.$router.push({ name: 'project-form', params: { id: id } });
      }
    }
  });
</script>
<style lang="scss">
  #new-project .bootstrap-icon {
    margin-right: 8px !important;
  }
</style>
