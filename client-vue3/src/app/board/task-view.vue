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
          @cancel="cancel"
        ></task-edit-form>
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
  import { NotificationService } from '@/shared/notification-service';

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
      };
    },
    computed: {
      notificationService(): NotificationService {
        return this.$services.notificationService;
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
        this.notificationService.notifyError(`Loading task details with id ${this.id} failed.`, 'Error', e);
        await this.navigateToBoard();
      } finally {
        this.isReady = true;
      }
    },
    methods: {
      async save(task: Task): Promise<void> {
        const errors = task.validate();
        if (errors.length > 0) {
          this.notificationService.notifyWarning(errors.join('\n'), 'Validation error');
          return;
        }

        try {
          await this.$services.taskService.save(task);
          this.notificationService.notifySuccess('Task saved.');
          await this.navigateToBoard();
        } catch (e) {
          this.notificationService.notifyError('Save failed.', 'Error', e);
        }
      },
      async remove(id: Identifier): Promise<void> {
        if (id.isNil() || !id.validate()) {
          this.notificationService.notifyWarning(`Unable to remove task. Id ${id} is invalid.`);
          await this.cancel();
          return;
        }

        try {
          await this.$services.taskService.delete(id);
          this.notificationService.notifySuccess('Task removed.');
          await this.navigateToBoard();
        } catch (e) {
          this.notificationService.notifyError('Remove failed.', 'Error', e);
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
