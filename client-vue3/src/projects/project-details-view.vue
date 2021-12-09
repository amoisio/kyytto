<template>
  <div class="row">
    <div class="col-12 col-md-6">
      <project-details :project="item" @save="save" @remove="remove" @cancel="cancel"></project-details>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import ProjectDetails from './project-details.vue';
  import { IProject } from './project';
  import { IProjectService, ProjectService } from './project-service';
  export default defineComponent({
    name: 'ProjectDetailsView',
    components: {
      ProjectDetails
    },
    emits: ['save', 'remove', 'cancel'],
    props: {
      id: {
        type: String,
        required: true
      }
    },
    created() {
      this.item = {} as IProject;
      if (!this.isNew) {
        try {
          this.item = this.service.getById(this.id);
        } catch (e) {
          console.error(e);
        }
      }
    },
    computed: {
      service(): IProjectService {
        return new ProjectService();
      },
      isNew(): boolean {
        return this.id === '0';
      }
    },
    data() {
      return {
        item: {} as IProject
      };
    },
    methods: {
      save(project: IProject) {
        if (this.isNew) {
          this.service.create(project);
        } else {
          this.service.update(project);
        }
        this.navigateToProjects();
      },
      remove(project: IProject) {
        this.service.remove(project);
        this.navigateToProjects();
      },
      cancel() {
        this.navigateToProjects();
      },
      navigateToProjects() {
        this.$router.push({ name: 'projects' });
      }
    }
  });
</script>
