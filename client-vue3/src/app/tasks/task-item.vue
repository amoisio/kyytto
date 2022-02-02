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
        <div class="col px-0 pb-1">
          <k-tag-list v-if="task" :tags="task.tags"></k-tag-list>
        </div>
        <div class="col-auto text-end px-0">
          <k-button-danger 
            v-if="task.isStarted() && !task.isCompleted()" 
            class="me-1 px-1 pt-0 pb-1" 
            size="md" 
            icon="stop" 
            @activate="$emit('stop', task)"></k-button-danger>
          <k-button-success 
            v-if="!task.isStarted() && !task.isCompleted()" 
            class="px-1 pt-0 pb-1" 
            size="md" 
            icon="play" 
            @activate="$emit('start', task)"></k-button-success>
          <k-button-success 
            v-if="task.isStarted() && !task.isCompleted()" 
            class="px-1 pt-0 pb-1" 
            size="md" 
            icon="check" 
            @activate="$emit('complete', task)"></k-button-success>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Task } from './task-models';
  import BorderedIcon from '@/shared/bordered-icon.vue';
  import KButtonDanger from '@/shared/k-button-danger.vue';
  import KButton from '@/shared/k-button.vue';
  import KButtonSuccess from '@/shared/k-button-success.vue';
  import KTagList from '@/shared/k-tag-list.vue';

  export default defineComponent({
    name: 'TaskItem',
    emits: ['up', 'down', 'left', 'right', 'edit', 'start', 'stop', 'complete'],
    components: {
      BorderedIcon,
      KButtonDanger,
      KButton,
      KButtonSuccess,
      KTagList
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
