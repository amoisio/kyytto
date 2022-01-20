<template>
  <div class="task-view" v-if="isReady">
    <div class="row pb-3 pt-3">
      <div class="col-12 col-md-6">
        <h1>Task</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <task-edit-form 
          v-model="task"
          :projects="projects"
          :tags="tags"
        ></task-edit-form>
      </div>
    </div>
    <div> {{ task }}</div>
    <div class="row">
      <div class="col-6 col-md-3">
        <button type="button" @click="save" class="btn btn-outline-success me-2">Save</button>
        <button type="button" @click="cancel" class="btn btn-outline-secondary">Cancel</button>
      </div>
      <div class="col-6 col-md-3 text-end">
        <button type="button" @click="remove" class="btn btn-outline-danger">Remove</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import TaskEditForm from './task-edit-form.vue';
  import { Project } from '../projects/project-models';
  import { Task } from './task-models';
  import { Identifier, IdentifierType } from 'kyytto-models';
  import { NotificationService } from '@/shared/notification-service';
  import { Tag } from '../tags/tag-models';

  export default defineComponent({
    name: 'TaskView',
    components: {
      TaskEditForm
    },
    props: {
      id: {
        type: Object as PropType<IdentifierType>,
        required: true,
        validator: (uuid: IdentifierType) => Identifier.isValidOrNil(uuid)
      }
    },
    data() {
      return {
        isReady: false,
        task: {} as Task,
        projects: [] as Project[],
        tags: [] as Tag[]
      };
    },
    computed: {
      notifier(): NotificationService {
        return this.$services.notificationService;
      },
      color(): string {
        return this.task.project.color;
      }
    },
    async created() {
      try {
        this.isReady = false;
        this.task = Identifier.isNil(this.id)
          ? new Task()
          : await this.$services.taskService.getById(this.id);
        this.projects = await this.$services.projectService.getAll();
        this.tags = await this.$services.tagService.getAllUserTags();
      } catch (e) {
        this.notifier.notifyError(`Loading task details with id ${this.id} failed.`, 'Error', e);
        await this.navigateToBoard();
      } finally {
        this.isReady = true;
      }
    },
    methods: {
      async save(): Promise<void> {
        const task = this.task;
        const errors = task.validate();
        if (errors.length > 0) {
          this.notifier.notifyWarning(errors.join('\n'), 'Validation error');
          return;
        }

        try {
          const id = await this.$services.taskService.save(task);
          this.notifier.notifySuccess('Task saved.');
          await this.navigateToBoard();
        } catch (e) {
          this.notifier.notifyError('Save failed.', 'Error', e);
        }
      },
      async remove(): Promise<void> {
        const id = this.id;
        if (!Identifier.isValid(id)) {
          this.notifier.notifyWarning(`Unable to remove task. Id ${id} is invalid.`);
          await this.cancel();
          return;
        }

        try {
          await this.$services.taskService.delete(id);
          this.notifier.notifySuccess('Task removed.');
          await this.navigateToBoard();
        } catch (e) {
          this.notifier.notifyError('Remove failed.', 'Error', e);
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
