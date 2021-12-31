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
  import { Task, TaskEditFormModel } from './task-models';
  import { isNew } from '@/shared/utilities';
  import { validate as uuidValidate } from 'uuid';
import { idBuilder, Identifier } from 'kyytto-models';

  export default defineComponent({
    name: 'TaskView',
    components: {
      TaskEditForm
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
        model: new TaskEditFormModel(),
        projects: new Array<IProject>()
      };
    },
    computed: {
      isNew(): boolean {
        return isNew(this.id);
      }
    },
    async created() {
      try {
        this.projects = await this.$services.projectService.getAll();
        this.model.id = this.id;
        if (!this.isNew) {
          const task = await this.$services.taskService.getById(idBuilder(this.id));
          this.model.title = task.title;
          this.model.description = task.description;
          this.model.state = task.state;
          this.model.project = task.project;
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
        if (model.id === undefined) {
          throw new Error('Id must be provided.');
        }

        if (model.title === undefined) {
          throw new Error('Title must be given.');
        }

        if (model.state === undefined) {
          throw new Error('State must be set.');
        }

        if (model.project === undefined) {
          throw new Error('Project must be given.');
        }

        const task = new Task(idBuilder(model.id), model.title, model.description, model.state, model.project);

        if (this.isNew) {
          this.$services.taskService.create(task);
        } else {
          this.$services.taskService.update(task);
        }

        this.navigateToBoard();
      },
      remove() {
        this.$services.taskService.delete(idBuilder(this.id));
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
