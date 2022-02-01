<template>
  <b-card
    no-body
    class="work-item"
    bg-variant="light"
    tabindex="0"
    @dblclick="$emit('edit', task)"
    @keyup.enter="$emit('edit', task)"
    @keyup.up="$emit('up', task)"
    @keyup.down="$emit('down', task)">
    <b-card-body class="p-1">
      <div class="row mx-0 align-items-center">
        <div class="col-10 ps-1">
          <span>{{ task.title }}</span>
        </div>
        <div class="col-2 pe-0 text-end">
          <k-button-success icon="play" @activate="$emit('start', task)"></k-button-success>
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Task } from '../tasks/task-models';
  import KButtonSuccess from '@/shared/k-button-success.vue';

  export default defineComponent({
    name: "WorkItem",
    components: { 
      KButtonSuccess
    },
    emits: ["up", "down", "edit", "start"],
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
  .work-item {
    &:hover {
      border-color: custom.$dark1;
    }

    .badge {
      border-color: custom.$dark1;
    }
  }
</style>
