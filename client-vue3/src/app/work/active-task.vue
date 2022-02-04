<template>
  <b-card
    no-body
    class="active-task"
    bg-variant="light"
    tabindex="0"
    @dblclick="$emit('edit', task)"
    @keyup.enter="$emit('edit', task)">
    <b-card-header>
      <h3>{{ task?.title }}</h3>
      <k-tag-list v-if="task" :tags="task.tags.map(t => t.name)"></k-tag-list>
    </b-card-header>
    <b-card-body>
      <span v-if="task?.description">{{ task?.description }}</span>
    </b-card-body>
    <b-card-footer>
      <div class="row">
        <div class="col-6">
          <k-button-stop @activate="$emit('stop', task)"></k-button-stop>
        </div>
        <div class="col-6 text-end">
          <k-button-complete @activate="$emit('complete', task)"></k-button-complete>
        </div>
      </div>
    </b-card-footer>
  </b-card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Task } from '../tasks/task-models';

  export default defineComponent({
    name: 'ActiveTask',
    emits: ['stop', 'edit', 'complete'],
    props: {
      task: {
        type: Task,
        required: false
      }
    }
  });
</script>
<style lang="scss">
  @use '@/app/custom';
  .active-task {
    &:hover {
      border-color: custom.$dark1;
    }
  }
</style>

