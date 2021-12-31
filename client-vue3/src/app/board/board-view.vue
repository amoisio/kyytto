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
      <div class="col">
        <task-list
          :tasks="todoTasks"
          @right="start"
          @edit="edit"
          @start="start">Todos</task-list>
      </div>
      <div class="col">
        <task-list
          :tasks="startedTasks"
          @left="stop"
          @right="complete"
          @edit="edit"
          @stop="stop"
          @complete="complete">In Progress</task-list>
      </div>
      <div class="col">
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
  import { ITask } from './task-models';
  import { NEWID } from '@/shared/utilities';

  export default defineComponent({
    name: 'BoardView',
    components: {
      TaskList
    },
    data() {
      return {
        tasks: new Array<ITask>()
      };
    },
    computed: {
      todoTasks(): ITask[] {
        return this.tasks.filter((task) => !task.isCompleted() && !task.isStarted());
      },
      startedTasks(): ITask[] {
        return this.tasks.filter((task) => task.isStarted());
      },
      completedTasks(): ITask[] {
        return this.tasks.filter((task) => task.isCompleted());
      }
    },
    async created() {
      this.tasks = await this.$services.taskService.getAll();
    },
    methods: {
      navigateToTaskForm(task?: ITask) {
        const id = task?.id.value ?? NEWID;
        this.$router.push({ name: 'task', params: { id: id } });
      },
      moveUp(task: ITask) {
        alert('moveUp' + task.id);
        // const index = this.items.findIndex(task => task.id === id);
        // if (index > 0) {
        //   this.swap(index, index - 1);
        // }
      },
      moveDown(task: ITask) {
        alert('moveDown' + task.id);
        // const index = this.items.findIndex(task => task.id === id);
        // const lastIndex = this.items.length - 1;
        // if (index < lastIndex) {
        //   this.swap(index, index + 1);
        // }
      },
      edit(task: ITask) {
        this.$router.push({ name: 'task', params: { id: task.id.value } });
      },
      start(task: ITask) {
        task.startWork();
        this.$services.taskService.update(task);
      },
      stop(task: ITask) {
        task.stopWork();
        this.$services.taskService.update(task);
      },
      complete(task: ITask) {
        task.complete();
        this.$services.taskService.update(task);
      },
      swap(ind1: number, ind2: number) {
        const temp = this.tasks[ind1];
        this.tasks[ind1] = this.tasks[ind2];
        this.tasks[ind2] = temp;
        this.$nextTick();
      }
    }
  });
</script>
<style lang="scss">
  #new-item .bootstrap-icon {
    margin-right: 8px !important;
    margin-top: -2px;
  }
</style>
