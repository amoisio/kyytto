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
        <div class="row task-list">
          <div class="col">
            Todo Item goes here
          </div>    
        </div>
      </div>
      <div class="col">
        <div class="row task-state-title">
          <div class="col">
            <span>In Progress</span>
          </div>
        </div>
        <div class="row task-list">
          <div class="col">
            In Progress Item goes here
          </div>    
        </div>
      </div>
      <div class="col">
        <div class="row task-state-title">
          <div class="col">
            <span>Completed</span>
          </div>
        </div>
        <div class="row task-list">
          <div class="col">
            Completed Item goes here
          </div>    
        </div>  
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { parse } from '@/lib/hrefParser';
  import { defineComponent } from 'vue';
  import { ITask } from './task-models';

  export default defineComponent({
    name: 'BoardView',
    computed: {},
    // data() {
    //   return {
    //     projects: [] as IProject[]
    //   };
    // },
    methods: {
      navigateToTaskForm(task?: ITask) {
        const id = task
          ? parse(task.href).id
          : '0';
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
