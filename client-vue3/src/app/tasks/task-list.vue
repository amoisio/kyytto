<template>
  <div class="row">
    <div class="col-12">
      <k-two-part-header class="m-2">
        <template v-slot:default>
          <slot>Tasks</slot>
        </template>
        <template v-slot:right>
          <slot name="count">
            <h2>{{ tasks.length }}</h2>
          </slot>
        </template>
      </k-two-part-header>
      <task-list-items
        :tasks="tasks"
        @up="$emit('up', $event)"
        @down="$emit('down', $event)"
        @left="$emit('left', $event)"
        @right="$emit('right', $event)"
        @edit="$emit('edit', $event)"
        @start="$emit('start', $event)"
        @stop="$emit('stop', $event)"
        @complete="$emit('complete', $event)"
      >
        <template v-slot:default="{ task }">
          <slot name="item" :task="task"></slot>
        </template>
      </task-list-items>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import KTwoPartHeader from '@/shared/k-two-part-header.vue';
  import TaskListItems from './task-list-items.vue';
  import { Task } from './task-models';

  export default defineComponent({
    name: 'TaskList',
    components: {
      KTwoPartHeader,
      TaskListItems
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
