<template>
  <div class="project-form">
    <div class="row pb-3 pt-3">
      <div class="col-6 col-md-3">
        <h1>Project</h1>
      </div>
      <div class="col-6 col-md-3 align-self-center text-end">
        <div class="position-relative mb-4 me-4">
          <bordered-icon icon="tag" scale="2" :color="project.color" border-color="black"> </bordered-icon>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <project-edit-form v-model="model" @remove="remove" @cancel="cancel"></project-edit-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import ProjectEditForm from './project-edit-form.vue';
  import BorderedIcon from '@/lib/bordered-icon.vue';
  import { IProject } from './project';
  import { IProjectService, ProjectService } from './project-service';
  import { colorWheel } from '@/lib/colorWheel';
  import { ProjectEditFormModel } from './project-edit-form-model';

  export default defineComponent({
    name: 'ProjectDetailsView',
    components: {
      ProjectEditForm,
      BorderedIcon
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        model: new ProjectEditFormModel(),
        project: {} as IProject
      };
    },
    computed: {
      service(): IProjectService {
        return new ProjectService();
      },
      isNew(): boolean {
        return this.id === '0';
      }
    },
    created() {
      try {
        let project: IProject;
        if (this.isNew) {
          project = {} as IProject;
          project.color = colorWheel.next();
        } else {
          project = this.service.getById(this.id);
          this.model.name = project.name;
          this.model.description = project.description;
        }
        this.project = project;
      } catch (e) {
        console.error(e);
        this.navigateToProjects();
      }
    },
    watch: {
      model(newModel) {
        this.save(newModel);
      }
    },
    methods: {
      save(model: ProjectEditFormModel) {
        this.project.name = model.name;
        this.project.description = model.description;
        if (this.isNew) {
          this.service.create(this.project);
        } else {
          this.service.update(this.project);
        }
        this.navigateToProjects();
      },
      remove() {
        this.service.remove(this.project);
        this.navigateToProjects();
      },
      cancel() {
        colorWheel.prev();
        this.navigateToProjects();
      },
      navigateToProjects() {
        this.$router.push({ name: 'projects' });
      }
    }
  });
</script>
