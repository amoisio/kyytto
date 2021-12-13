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
  import { ITask, TaskEditFormModel } from './task-models';

  export default defineComponent({
    name: 'TaskView',
    components: {
      TaskEditForm
    },
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        model: new TaskEditFormModel(),
        task: undefined as ITask | undefined,
        projects: new Array<IProject>()
      };
    },
    computed: {
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
        this.projects = this.$services.projectService.getAll();
        if (!this.isNew) {
          const task = this.$services.taskService.getById(this.id);
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
      save(model: TaskEditFormModel) {
        if (model.title === undefined) {
          throw new Error('Title must be given!');
        }

        if (model.project === undefined) {
          throw new Error('Project must be given!');
        }

        if (this.isNew) {
          this.$services.taskService.create(model.title, model.description, model.project);
        } else {
          if (this.task === undefined) {
            throw new Error('Task must be defined!');
          }

          this.task.title = model.title;
          this.task.description = model.description;
          this.task.state = model.state;
          this.task.projectHref = model.project.href;
          this.$services.taskService.update(this.task);
        }
        this.navigateToBoard();
      },
      remove() {
        this.$services.taskService.remove(this.id);
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
