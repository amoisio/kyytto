<template>
  <div class="project-view">
    <div class="row pb-3 pt-3">
      <div class="col-6 col-md-3">
        <h1>Project</h1>
      </div>
      <div class="col-6 col-md-3 align-self-center text-end">
        <div class="position-relative mb-4 me-4">
          <bordered-icon icon="tag" scale="2" :color="model.color" border-color="black"></bordered-icon>
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
  import BorderedIcon from '@/shared/bordered-icon.vue';
  import { colorWheel } from '@/shared/colorWheel';
  import { Project, ProjectEditFormModel } from './project-models';
  import { isNew } from '@/shared/utilities';
  import { validate as uuidValidate } from 'uuid';

  export default defineComponent({
    name: 'ProjectView',
    components: {
      ProjectEditForm,
      BorderedIcon
    },
    props: {
      id: {
        type: String,
        required: true,
        validator: uuidValidate
      }
    },
    data() {
      return {
        model: new ProjectEditFormModel()
      };
    },
    computed: {
      isNew(): boolean {
        return isNew(this.id);
      }
    },
    created() {
      try {
        this.model.id = this.id;
        if (this.isNew) {
          this.model.color = colorWheel.next();
        } else {
          const project = this.$services.projectService.getById(this.id);
          this.model.name = project.name;
          this.model.description = project.description;
          this.model.color = project.color;
        }
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
        if (model.id === undefined) {
          throw new Error('Id must be provided.');
        }

        if (model.name === undefined) {
          throw new Error('Name must be given.');
        }

        if (model.color === undefined) {
          throw new Error('Color must be given');
        }

        const project = new Project(model.id, model.name, model.description, model.color);

        if (this.isNew) {
          this.$services.projectService.create(project);
        } else {
          this.$services.projectService.update(project);
        }

        this.navigateToProjects();
      },
      remove() {
        this.$services.projectService.remove(this.id);
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
