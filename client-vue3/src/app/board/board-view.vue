<template>
  <div class="board-view">
    <div class="row pb-3 pt-3">
      <div class="col-auto">
        <h1>Board</h1>
      </div>
      <div class="col align-self-center">
        <button id="new-item" class="btn btn-outline-primary" @click="navigateToTaskForm()">
          <span class="fs-5">New Item</span>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col mx-2 mb-2 task-list">
        <task-list
          :tasks="todoTasks"
          @right="start"
          @edit="edit"
          @start="start">Todos</task-list>
      </div>
      <div class="col mx-2 mb-2 task-list">
        <task-list
          :tasks="startedTasks"
          @left="stop"
          @right="complete"
          @edit="edit"
          @stop="stop"
          @complete="complete">In Progress</task-list>
      </div>
      <div class="col mx-2 mb-2 task-list">
        <task-list
          :tasks="completedTasks"
          @edit="edit">Completed</task-list>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import TaskList from './task-list.vue';
  import { Task } from './task-models';
  import { NEWID } from '@/shared/utilities';

  export default defineComponent({
    name: 'BoardView',
    components: {
      TaskList
    },
    data() {
      return {
        tasks: new Array<Task>()
      };
    },
    computed: {
      todoTasks(): Task[] {
        return this.tasks.filter((task) => !task.isCompleted() && !task.isStarted());
      },
      startedTasks(): Task[] {
        return this.tasks.filter((task) => task.isStarted());
      },
      completedTasks(): Task[] {
        return this.tasks.filter((task) => task.isCompleted());
      }
    },
    async created() {
      this.tasks = await this.$services.taskService.getAll();
    },
    methods: {
      async navigateToTaskForm(task?: Task): Promise<void> {
        const id = task?.id.value ?? NEWID;
        await this.$router.push({ name: 'task', params: { id: id } });
      },
      moveUp(task: Task) {
        alert('moveUp' + task.id);
        // const index = this.items.findIndex(task => task.id === id);
        // if (index > 0) {
        //   this.swap(index, index - 1);
        // }
      },
      moveDown(task: Task) {
        alert('moveDown' + task.id);
        // const index = this.items.findIndex(task => task.id === id);
        // const lastIndex = this.items.length - 1;
        // if (index < lastIndex) {
        //   this.swap(index, index + 1);
        // }
      },
      async edit(task: Task): Promise<void> {
        await this.$router.push({ name: 'task', params: { id: task.id.value } });
      },
      async start(task: Task): Promise<void> {
        task.startWork();
        await this.$services.taskService.update(task);
      },
      async stop(task: Task): Promise<void> {
        task.stopWork();
        await this.$services.taskService.update(task);
      },
      async complete(task: Task): Promise<void> {
        task.complete();
        await this.$services.taskService.update(task);
      },
      async swap(ind1: number, ind2: number): Promise<void> {
        const temp = this.tasks[ind1];
        this.tasks[ind1] = this.tasks[ind2];
        this.tasks[ind2] = temp;
        await this.$nextTick();
      }
    }
  });
</script>
<style lang="scss">
  @use '../custom';
  @use 'sass:color';

  // .task-list {
  //   background-color: color.scale(custom.$light1, $lightness: 40%);
  // }
</style>
