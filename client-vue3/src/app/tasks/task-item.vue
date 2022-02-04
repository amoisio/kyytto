<template>
  <b-card
    no-body
    class="task-item"
    bg-variant="light"
    tabindex="0"
    @dblclick="$emit('edit', task)"
    @keyup.enter="$emit('edit', task)"
    @keyup.up="$emit('up', task)"
    @keyup.down="$emit('down', task)"
    @keyup.left="$emit('left', task)"
    @keyup.right="$emit('right', task)"
  >
    <b-card-header>
      <div class="row mx-0">
        <div class="col-11 px-0">
          <strong>{{ task.title }}</strong>
        </div>
        <div class="col-1 px-3 text-end">
          <bordered-icon v-if="task.isBug" icon="bug" scale="2" color="#ff0000" border-color="black"></bordered-icon>
        </div>
      </div>
    </b-card-header>
    <b-card-body class="p-2 pt-2">
      <div class="row mx-0 align-items-center">
        <div class="col px-0 pb-0">
          <k-tag-list v-if="task" :tags="task.tags.map(t => t.name)"></k-tag-list>
        </div>
        <div class="col-auto text-end px-0">
          <k-button-stop
            v-if="task.isStarted() && !task.isCompleted()" 
            class="px-0 py-0" 
            @activate="$emit('stop', task)"></k-button-stop>
          <k-button-start 
            v-if="!task.isStarted() && !task.isCompleted()" 
            class="px-0 py-0" 
            @activate="$emit('start', task)"></k-button-start>
          <k-button-complete 
            v-if="task.isStarted() && !task.isCompleted()" 
            class="px-0 py-0" 
            @activate="$emit('complete', task)"></k-button-complete>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Task } from './task-models';
  import BorderedIcon from '@/shared/bordered-icon.vue';

  export default defineComponent({
    name: 'TaskItem',
    emits: ['up', 'down', 'left', 'right', 'edit', 'start', 'stop', 'complete'],
    components: {
      BorderedIcon
    },
    props: {
      task: {
        type: Object as PropType<Task>,
        required: true
      }
    },
    computed: {
      color(): string {
        return this.task.project.color;
      }
    }
  });
</script>
<style lang="scss">
  @use '@/app/custom';
  .task-item {
    &:hover {
      border-color: custom.$dark1;
    }

    .badge {
      border-color: custom.$dark1;
    }
  }
</style>
