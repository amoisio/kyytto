<template>
  <b-card
    no-body
    class="active-task"
    bg-variant="light"
    tabindex="0">
    <b-card-header>
      <h3>{{ task?.title }}</h3>
      <k-tag-list v-if="task" :tags="task.tags"></k-tag-list>
    </b-card-header>
    <b-card-body>
      <span v-if="task?.description">{{ task?.description }}</span>
    </b-card-body>
    <b-card-footer>
      <div class="row">
        <div class="col-6">
          <k-button-stop @activate="$emit('stop', task)"></k-button-stop>
          <k-button-edit @activate="$emit('edit', task)"></k-button-edit>
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
  import BorderedIcon from '../../shared/bordered-icon.vue';
  import KTagList from '@/shared/k-tag-list.vue';

  export default defineComponent({
    name: 'ActiveTask',
    emits: ['stop', 'edit', 'complete'],
    components: {
      BorderedIcon,
      KTagList
    },
    props: {
      task: {
        type: Task,
        required: false
      }
    }
  });
</script>
