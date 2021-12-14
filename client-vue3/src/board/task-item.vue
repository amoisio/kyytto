<template>
  <div class="card">
    <div class="card-body px-2 py-1">
      <div class="row">
          <div class="col-auto">
              <bordered-icon icon="star" scale="1" :color="task.project?.color" border-color="black"></bordered-icon>
          </div>
          <div class="col">{{ task.title }}</div>
          <div class="col"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { ITask } from './task-models';
  import BorderedIcon from '@/lib/bordered-icon.vue';

  export default defineComponent({
    name: 'TaskItem',
    components: {
      BorderedIcon
    },
    props: {
      task: {
        type: Object as PropType<ITask>,
        required: true
      }
    }
  });
</script>
