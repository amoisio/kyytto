<template>
  <div class="row mb-1" v-for="task of tasks" :key="task.id">
    <div class="col-12">
      <slot :task="task">
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
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import TaskItem from './task-item.vue';
  import { Task } from './task-models';

  export default defineComponent({
    name: 'TaskListItems',
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
