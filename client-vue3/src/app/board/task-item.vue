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
        <div class="col-12 px-0">
          <span>
            <strong>{{ task.title }}</strong>
            </span>
        </div>
      </div>
    </b-card-header>
    <b-card-body class="p-2 pt-2">
      <div class="row align-items-end mx-0">
        <div class="col px-0">
          <span class="badge square-pill" :style="{ 'background-color': color }" v-for="tag of task.tags" :key="tag.id">
            {{ tag.name }}
          </span>
        </div>
        <div class="col-auto text-end px-0">
          <b-button
            v-if="!task.isStarted() && !task.isCompleted()"
            variant="outline-success"
            class="ms-2 px-1 py-0"
            @click.stop="$emit('start', task)"
            @keyup.enter.stop.prevent="$emit('start', task)"
          >
            Start
          </b-button>
          <b-button
            v-if="task.isStarted() && !task.isCompleted()"
            variant="outline-danger"
            class="ms-2 px-1 py-0"
            @click.stop="$emit('stop', task)"
            @keyup.enter.stop.prevent="$emit('stop', task)"
          >
            Stop
          </b-button>
          <b-button
            v-if="task.isStarted() && !task.isCompleted()"
            variant="outline-success"
            class="ms-2 px-1 py-0"
            @click.stop="$emit('complete', task)"
            @keyup.enter.stop.prevent="$emit('complete', task)"
          >
            Complete
          </b-button>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Task } from './task-models';

  export default defineComponent({
    name: 'TaskItem',
    emits: ['up', 'down', 'left', 'right', 'edit', 'start', 'stop', 'complete'],
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
