<template>
  <div class="project-view">
    <div class="row pb-3 pt-3">
      <div class="col-6 col-md-3">
        <h1>Project</h1>
      </div>
      <div class="col-6 col-md-3 align-self-center text-end">
        <div class="position-relative mb-4 me-4">
          <bordered-icon icon="tag" scale="2" :color="color" border-color="black"></bordered-icon>
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
  import { defineComponent, inject } from 'vue';
  import ProjectEditForm from './project-edit-form.vue';
  import BorderedIcon from '@/lib/bordered-icon.vue';
  import { IProjectService } from './project-service';
  import { colorWheel } from '@/lib/colorWheel';
  import { ProjectEditFormModel } from './project-edit-form-model';

  export default defineComponent({
    name: 'ProjectView',
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
        color: '' as string
      };
    },
    computed: {
      service(): IProjectService {
        return inject('projectService') as IProjectService;
      },
      isNew(): boolean {
        return this.id === '0';
      }
    },
    created() {
      try {
        if (this.isNew) {
          this.color = colorWheel.next();
        } else {
          const project = this.service.getById(this.id);
          this.model.name = project.name;
          this.model.description = project.description;
          this.color = project.color;
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
        if (model.name === undefined) {
          throw new Error('Name must be given.');
        }

        if (this.isNew) {
          this.service.create(model.name, model.description, this.color);
        } else {
          const project = this.service.getById(this.id);
          project.name = model.name;
          project.description = model.description;
          this.service.update(project);
        }
        this.navigateToProjects();
      },
      remove() {
        this.service.remove(this.id);
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
