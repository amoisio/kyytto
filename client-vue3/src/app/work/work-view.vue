<template>
  <div class="work-view container pb-2 my-5" v-if="isReady">
    <div class="row py-3">
      <div class="col-12">
        <h1>Work</h1>
      </div>
    </div>
    <div class="row py-3">
      <div class="col-6">
        <current-task v-model="currentTask"></current-task>
      </div>
      <div class="col-6">
        <current-stack v-model="currentStack"></current-stack>
        <task-list :tasks="tasks"></task-list>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NotificationService } from '@/shared/notification-service';
  import CurrentTask from './current-task.vue';
  import CurrentStack from './current-stack.vue';
  import TaskList from '../tasks/task-list.vue';
  import { Task } from '../tasks/task-models';
  import { Stack } from '../stacks/stack-models';
  import { User } from '../users/user-models';

  export default defineComponent({
    name: "WorkView",
    components: {
      CurrentTask,
      CurrentStack,
      TaskList
    },
    data() {
        return {
            isReady: false,
            user: {} as User,
            tasks: [] as Task[],
            currentStack: undefined as Stack | undefined,
            currentTask: undefined as Task | undefined
        };
    },
    computed: {
        notifier(): NotificationService {
            return this.$services.notificationService;
        }
    },
    async created() {
        try {
            this.isReady = false;
            this.user = this.$authentication.user!;
            const tasks = await this.$services.taskService.getAll();
            if (this.user.stack) {
                const stack = await this.$services.stackService.getById(this.user.stack.id);
                this.tasks = tasks.filter(task => stack.isStackTask(task));
                this.currentStack = stack;
            }
            this.currentTask = tasks.find(task => task.isStarted());
        }
        catch (e) {
            this.notifier.notifyError(`Loading work view failed.`, "Error", e);
        }
        finally {
            this.isReady = true;
        }
    },
    methods: {}
});
</script>
