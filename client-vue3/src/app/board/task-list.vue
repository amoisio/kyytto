<template>
  <div class="row task-state-title">
    <div class="col">
      <div class="row">
        <div class="col-auto">
          <slot></slot>
        </div>
        <div class="col text-end">
          {{ tasks.length }}
        </div>
      </div>
    </div>
  </div>
  <div class="row mb-2" v-for="task of tasks" :key="task.id">
    <div class="col">
      <task-item
        :task="task"
        @up="$emit('up', task)"
        @down="$emit('down', task)"
        @left="$emit('left', task)"
        @right="$emit('right', task)"
        @edit="$emit('edit', task)"
        @start="$emit('start', task)"
        @stop="$emit('stop', task)"
        @complete="$emit('complete', task)"
      ></task-item>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import TaskItem from './task-item.vue';
  import { ITask } from './task-models';

  export default defineComponent({
    name: 'TaskList',
    components: {
      TaskItem
    },
    emits: ['up', 'down', 'left', 'right', 'edit', 'start', 'stop', 'complete'],
    props: {
      tasks: {
        type: Array as PropType<ITask[]>,
        required: true
      }
    }
  });
</script>
<style lang="scss"></style>
