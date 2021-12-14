<template>
  <div class="board-view">
    <div class="row pb-3 pt-3">
      <div class="col-auto">
        <h1>Board</h1>
      </div>
      <div class="col align-self-center">
        <button id="new-item" class="btn btn-outline-primary" @click="navigateToTaskForm()">
          <b-icon icon="star" size="2x"></b-icon>
          <span class="fs-5">New Item</span>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="row task-state-title">
          <div class="col">
            <span>Todo</span>
          </div>
        </div>
        <div class="row mb-1" v-for="task of todoTasks" :key="task.id">
          <div class="col">
            <task-item :task="task"></task-item>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row task-state-title">
          <div class="col">
            <span>In Progress</span>
          </div>
        </div>
        <div class="row mb-1" v-for="task of startedTasks" :key="task.id">
          <div class="col">
            <task-item :task="task"></task-item>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row task-state-title">
          <div class="col">
            <span>Completed</span>
          </div>
        </div>
        <div class="row mb-1  " v-for="task of completedTasks" :key="task.id">
          <div class="col">
            <task-item :task="task"></task-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import TaskItem from './task-item.vue';
  import { ITask } from './task-models';
  import { NEWID } from '@/utilities';

  export default defineComponent({
    name: 'BoardView',
    components: {
      TaskItem
    },
    data() {
      return {
        tasks: [] as ITask[]
      };
    },
    computed: {
      todoTasks(): ITask[] {
        return this.tasks.filter(task => !task.isCompleted() && !task.isStarted());
      },
      startedTasks(): ITask[] {
        return this.tasks.filter(task => task.isStarted());
      },
      completedTasks(): ITask[] {
        return this.tasks.filter(task => task.isCompleted());
      }
    },
    created() {
      this.tasks = this.$services.taskService.getAll();
    },
    methods: {
      navigateToTaskForm(task?: ITask) {
        const id = task?.id ?? NEWID;
        this.$router.push({ name: 'task', params: { id: id } });
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
