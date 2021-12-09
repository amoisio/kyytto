<template>
  <div class="project-form">
    <div class="row pb-3 pt-3">
      <div class="col-6 col-md-3">
        <h1>Project</h1>
      </div>
      <div class="col-6 col-md-3 align-self-center text-end">
        <div class="position-relative mb-4 me-4">
          <bordered-icon icon="tag" scale="2" :color="item.color" border-color="black"> </bordered-icon>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <project-details :project="item" @save="save" @remove="remove" @cancel="cancel"></project-details>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import ProjectDetails from './project-details.vue';
  import BorderedIcon from '@/lib/bordered-icon.vue';
  import { IProject } from './project';
  import { IProjectService, ProjectService } from './project-service';
  import { colorWheel } from '@/lib/colorWheel';
  export default defineComponent({
    name: 'ProjectDetailsView',
    components: {
      ProjectDetails,
      BorderedIcon
    },
    emits: ['save', 'remove', 'cancel'],
    props: {
      id: {
        type: String,
        required: true
      }
    },
    created() {
      try {
        if (this.isNew) {
          this.item = {} as IProject;
          this.item.color = colorWheel.next();
        } else {
          this.item = this.service.getById(this.id);
        }
      } catch (e) {
        console.error(e);
        this.navigateToProjects();
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
