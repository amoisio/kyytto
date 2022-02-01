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
          <k-button-danger icon="stop" @activate="$emit('stop', task)"></k-button-danger>
          <k-button class="ms-1" icon="pencil" @activate="$emit('edit', task)"></k-button>
        </div>
        <div class="col-6 text-end">
          <k-button-success icon="check" @activate="$emit('complete', task)"></k-button-success>
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
  import KButtonDanger from '@/shared/k-button-danger.vue';
  import KButton from '@/shared/k-button.vue';
  import KButtonSuccess from '@/shared/k-button-success.vue';

  export default defineComponent({
    name: 'ActiveTask',
    emits: ['stop', 'edit', 'complete'],
    components: {
    BorderedIcon,
    KTagList,
    KButtonDanger,
    KButton,
    KButtonSuccess
  },
    props: {
      task: {
        type: Task,
        required: false
      }
    }
  });
</script>
