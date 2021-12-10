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
  import { IProject } from '../projects/project';
  import { IProjectService, ProjectService } from '../projects//project-service';
  import { TaskEditFormModel } from './task-edit-form-model';
  import { ITaskService, TaskService } from './task-service';
  import { ITask } from './task-item';

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
        task: {} as ITask,
        projects: [] as IProject[]
      };
    },
    computed: {
      projectService(): IProjectService {
        return new ProjectService();
      },
      taskService(): ITaskService {
        return new TaskService();
      },
      isNew(): boolean {
        return this.id === '0';
      },
      color(): string {
        return this.isNew
          ? 'white'
          : this.task.project.color;
      }
    },
    created() {
      try {
        this.projects = this.projectService.getAll();
        console.table(this.projects);
        let task: ITask;
        if (this.isNew) {
          task = {} as ITask;
        } else {
          task = this.taskService.getById(this.id);
          this.model.title = task.title;
          this.model.description = task.description;
          this.model.project = task.project;
          this.model.state = task.state;
        }
        this.task = task;
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

        this.task.title = model.title;
        this.task.description = model.description;
        this.task.state = model.state;
        this.task.project = model.project;

        if (this.isNew) {
          this.taskService.create(this.task);
        } else {
          this.taskService.update(this.task);
        }
        this.navigateToBoard();
      },
      remove() {
        this.taskService.remove(this.task);
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
