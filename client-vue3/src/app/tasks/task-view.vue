<template>
  <div class="task-view container pb-2 my-5" v-if="isReady">
    <div class="row py-3">
      <div class="col-12">
        <k-page-header>Task</k-page-header>
      </div>
    </div>
    <div class="row py-3">
      <div class="col-12">
        <task-edit-form 
          v-model="task"
          :projects="projects"
          :tags="tags"
        ></task-edit-form>
      </div>
    </div>
    <div class="row py-3">
      <div class="col-6">
        <k-button-danger class="me-1" icon="x" @activate="remove"></k-button-danger>
        <k-button icon="arrow-left-short" @activate="cancel"></k-button>
      </div>
      <div class="col-6 text-end">
        <k-button-danger class="me-1" icon="stop" v-if="task.isStarted() && !task.isNew()" @activate="stop"></k-button-danger>
        <k-button-success class="me-1" icon="play" v-if="task.isTodo() && !task.isNew()" @activate="start"></k-button-success>
        <k-button-success class="me-1" icon="check" v-if="task.isStarted() && !task.isNew()" @activate="complete"></k-button-success>
        <k-button-success icon="arrow-down-short" @activate="save"></k-button-success>
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
  import KPageHeader from '@/shared/k-page-header.vue';
  import KButton from '@/shared/k-button.vue';
  import KButtonSuccess from '@/shared/k-button-success.vue';
  import KButtonDanger from '@/shared/k-button-danger.vue';

  export default defineComponent({
    name: 'TaskView',
    components: {
      TaskEditForm,
      KPageHeader,
      KButton,
      KButtonSuccess,
      KButtonDanger
    },
    props: {
      id: {
        type: String as PropType<IdentifierType>,
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
        await this.navigateBack();
      } finally {
        this.isReady = true;
      }
    },
    methods: {
      async stop(): Promise<void> {
        this.task.stopWork();
        await this.save();
      },
      async start(): Promise<void> {
        this.task.startWork();
        await this.save();
      },
      async complete(): Promise<void> {
        this.task.complete();
        await this.save();
      },
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
          await this.navigateBack();
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
          await this.navigateBack();
        } catch (e) {
          this.notifier.notifyError('Remove failed.', 'Error', e);
        }
      },
      async cancel(): Promise<void> {
        await this.navigateBack();
      },
      async navigateBack(): Promise<void> {
        await this.$router.back();
      }
    }
  });
</script>
