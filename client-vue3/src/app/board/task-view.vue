<template>
  <div class="task-view">
    <div class="row pb-3 pt-3">
      <div class="col-12 col-md-6">
        <h1>Task</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <task-edit-form 
          v-if="isReady"
          :task="task" 
          :projects="projects" 
          @save="save"
          @remove="remove" 
          @cancel="cancel"></task-edit-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import TaskEditForm from './task-edit-form.vue';
  import { Project } from '../projects/project-models';
  import { Task } from './task-models';
  import { Identifier } from 'kyytto-models';

  export default defineComponent({
    name: 'TaskView',
    components: {
      TaskEditForm
    },
    props: {
      id: {
        type: Object as PropType<Identifier>,
        required: true,
        validator: (uuid: Identifier) => uuid.validate()
      }
    },
    data() {
      return {
        isReady: false,
        task: {} as Task,
        projects: [] as Project[]
      }
    },
    async created() {
      try {
        this.isReady = false;

        this.projects = await this.$services.projectService.getAll();
        if (this.id.isNil()) {
          this.task = Task.empty();
        } else {
          this.task = await this.$services.taskService.getById(this.id);
        }
      } catch (e) {
        console.error(e);
        await this.navigateToBoard();
      } finally {
        this.isReady = true;
      }
    },
    methods: {
      async save(task: Task): Promise<void> {
        const errors = task.validate();
        if (errors.length > 0) {
          throw new Error(errors.join('/n'));
        }

        await this.$services.taskService.save(task);
        await this.navigateToBoard();
      },
      async remove(id: Identifier): Promise<void> {
        if (id.isNil() || !id.validate()) {
          await this.cancel();
        } else {
          await this.$services.taskService.delete(id);
          await this.navigateToBoard();
        }
      },
      async cancel(): Promise<void> {
        await this.navigateToBoard();
      },
      async navigateToBoard(): Promise<void> {
        await this.$router.push({ name: 'board' });
      }
    }
  });
</script>
