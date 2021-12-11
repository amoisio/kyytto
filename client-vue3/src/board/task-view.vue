<template>
  <div class="task-view">
    <div class="row pb-3 pt-3">
      <div class="col-12 col-md-6">
        <h1>Task</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <task-edit-form v-model="model" :projects="projects" @remove="remove" @cancel="cancel"></task-edit-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import TaskEditForm from './task-edit-form.vue';
  import { IProject } from '../projects/project-models';
  import { IProjectService } from '../projects/project-service';
  import { ITask, ITaskEditFormModel } from './task-models';
  import { ITaskService } from './task-service';

  export default defineComponent({
    name: 'TaskView',
    components: {
      TaskEditForm
    },
    inject: ['taskService', 'projectService'],
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        model: {} as ITaskEditFormModel,
        task: {} as ITask,
        projects: [] as IProject[]
      };
    },
    computed: {
      tService(): ITaskService {
        return (this as any).taskService as ITaskService;
      },
      pService(): IProjectService {
        return (this as any).projectService as IProjectService;
      },
      isNew(): boolean {
        return this.id === '0';
      },
      color(): string {
        return this.isNew || this.model.project === undefined
          ? 'white'
          : this.model.project.color;
      }
    },
    created() {
      try {
        this.projects = this.pService.getAll();
        if (!this.isNew) {
          const task = this.tService.getById(this.id);
          const project = this.projects.find(p => p.href === task.projectHref);
          this.model.title = task.title;
          this.model.description = task.description;
          this.model.project = project;
          this.model.state = task.state;
          this.task = task;
        }
      } catch (e) {
        console.error(e);
        this.navigateToBoard();
      }
    },
    watch: {
      model(newModel) {
        this.save(newModel);
      }
    },
    methods: {
      save(model: ITaskEditFormModel) {
        if (model.title === undefined) {
          throw new Error('Title must be given!');
        }

        if (model.project === undefined) {
          throw new Error('Project must be given!');
        }

        if (this.isNew) {
          this.tService.create(model.title, model.description, model.project);
        } else {
          this.task.title = model.title;
          this.task.description = model.description;
          this.task.state = model.state;
          this.task.projectHref = model.project.href;
          this.tService.update(this.task);
        }
        this.navigateToBoard();
      },
      remove() {
        this.tService.remove(this.id);
        this.navigateToBoard();
      },
      cancel() {
        this.navigateToBoard();
      },
      navigateToBoard() {
        this.$router.push({ name: 'board' });
      }
    }
  });
</script>
