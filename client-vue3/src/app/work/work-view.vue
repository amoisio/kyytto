<template>
  <div class="work-view container pb-2 my-5" v-if="isReady">
    <div class="row py-3">
      <div class="col-12">
        <k-page-header>Work</k-page-header>
      </div>
    </div>
    <div class="row py-3">
      <div class="col-6">
        <task-list :tasks="activeTasks">
          Active tasks
          <template v-slot:item="{ task: task }">
            <active-task 
              :task="task"
              @edit="editTask"
              @stop="stopTask"
              @complete="completeTask"></active-task>
          </template>
        </task-list>
      </div>
      <div class="col-6">
        <active-stack
          :stack="selectedStack"
          :is-active="selectedStack?.id === activeStack?.id"
          :stacks="stacks"
          @select="selectStack"
          @edit="editStack"
          @set="setDefaultStack"></active-stack>
        <task-list :tasks="todoTasks">
          Tasks
          <template v-slot:count>
            <h2>{{ todoTasks.length }} ({{ tasks.length }})</h2>
          </template>
          <template v-slot:item="{ task: task }">
            <work-item 
              :task="task" 
              @up="moveup" 
              @down="movedown" 
              @edit="editTask" 
              @start="startTask"></work-item>
          </template>
        </task-list>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NotificationService } from '@/shared/notification-service';
  import ActiveTask from './active-task.vue';
  import ActiveStack from './active-stack.vue';
  import TaskList from '../tasks/task-list.vue';
  import WorkItem from './work-item.vue';
  import { Task } from '../tasks/task-models';
  import { Stack } from '../stacks/stack-models';
  import { User } from '../users/user-models';

  export default defineComponent({
    name: 'WorkView',
    components: {
      ActiveTask,
      ActiveStack,
      TaskList,
      WorkItem
    },
    data() {
      return {
        isReady: false,
        user: {} as User,
        tasks: [] as Task[],
        stacks: [] as Stack[],
        selectedStack: undefined as Stack | undefined
      };
    },
    computed: {
      notifier(): NotificationService {
        return this.$services.notificationService;
      },
      todoTasks(): Task[] {
        return this.tasks.filter(task => task.isTodo());
      },
      activeTasks(): Task[] {
        return this.tasks.filter(task => task.isStarted());
      },
      activeStack(): Stack | undefined {
        return this.user.stack;
      }
    },
    async created() {
      try {
        this.isReady = false;
        this.user = this.$authentication.user!;
        this.stacks = await this.$services.stackService.getAll();
        await this.selectStack(this.user.stack);
      } catch (e) {
        this.notifier.notifyError(`Loading work view failed.`, 'Error', e);
      } finally {
        this.isReady = true;
      }
    },
    methods: {
      moveup(task: Task) {
        console.log('move up');
      },
      movedown(task: Task) {
        console.log('move down');
      },
      async editTask(task: Task): Promise<void> {
        await this.$router.push({ name: 'task', params: { id: task.id } });
      },
      async startTask(task: Task): Promise<void> {
        const state = task.state;
        if (task.isStarted()) {
          this.notifier.notifyWarning('Task is already started.');
          return;
        }
        if (task.isCompleted()) {
          this.notifier.notifyWarning('Task cannot be started.');
          return;
        }
        try {
          task.startWork();
          await this.$services.taskService.update(task);
          this.notifier.notifySuccess('Task started.');
        } catch (e) {
          task.state = state;
          this.notifier.notifyError('Task start.', 'Error', e);
        }
      },
      async stopTask(task: Task): Promise<void> {
        const state = task.state;
        if (task.isCompleted()) {
          this.notifier.notifyWarning('Task cannot be stopped.');
          return;
        }
        if (!task.isStarted()) {
          this.notifier.notifyWarning('Task is already stopped.');
          return;
        }
        try {
          task.stopWork();
          await this.$services.taskService.update(task);
          this.notifier.notifySuccess('Task stopped.');
        } catch (e) {
          this.notifier.notifyError('Task start.', 'Error', e);
          task.state = state;
        }
      },
      async completeTask(task: Task): Promise<void> {
        const state = task.state;
        if (task.isCompleted()) {
          this.notifier.notifyWarning('Task is already completed.');
          return;
        }
        if (!task.isStarted()) {
          this.notifier.notifyWarning('Task is must be started before it is completed.');
          return;
        }
        try {
          task.complete();
          await this.$services.taskService.update(task);
          this.notifier.notifySuccess('Task completed.');
        } catch (e) {
          this.notifier.notifyError('Task completion.', 'Error', e);
          task.state = state;
        }
      },
      async selectStack(stack?: Stack) {
        this.selectedStack = stack;
        if (stack === undefined) {
          this.activeTasks = [];
        } else {
          const tasks = await this.$services.taskService.getAll();
          this.tasks = tasks.filter((task) => stack?.isStackTask(task));
        }
      },
      async editStack(stack: Stack) {
        await this.$router.push({ name: 'stack-form', params: { id: stack.id } });
      },
      async setDefaultStack(stack: Stack) {
        this.user.stack = stack;
        await this.$services.userService.update(this.user);
      }
    }
  });
</script>
