<template>
  <div class="row">
    <div class="col-auto">
      <k-section-header>
        <slot></slot>
      </k-section-header>
    </div>
    <div class="col text-end">
      <slot name="right">
        {{ tasks.length }}
      </slot>
    </div>
  </div>
  <div class="row mb-1" v-for="task of tasks" :key="task.id">
    <div class="col-12">
      <slot name="item" :task="task">
        <task-item
          :task="task"
          @up="$emit('up', task)"
          @down="$emit('down', task)"
          @left="$emit('left', task)"
          @right="$emit('right', task)"
          @edit="$emit('edit', task)"
          @start="$emit('start', task)"
          @stop="$emit('stop', task)"
          @complete="$emit('complete', task)"></task-item>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import TaskItem from './task-item.vue';
  import { Task } from './task-models';
  
  export default defineComponent({
    name: 'TaskList',
    components: {
      TaskItem
    },
    emits: ['up', 'down', 'left', 'right', 'edit', 'start', 'stop', 'complete'],
    props: {
      tasks: {
        type: Array as PropType<Task[]>,
        required: true
      }
    }
  });
</script>
