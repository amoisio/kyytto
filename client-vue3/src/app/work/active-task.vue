<template>
  <div class="row">
    <div class="col-12">
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
              <b-button
                class="p-0"
                variant="outline-danger"
                @click.stop="$emit('stop', task)"
                @keyup.enter.stop.prevent="$emit('stop', task)">
                <b-icon icon="stop" size="2x"></b-icon>
              </b-button>
              <b-button
                class="p-0 ms-1"
                variant="outline-secondary"
                @click.stop="$emit('edit', task)"
                @keyup.enter.stop.prevent="$emit('edit', task)">
                <b-icon icon="pencil" size="2x"></b-icon>
              </b-button>
            </div>
            <div class="col-6 text-end">
              <b-button
                class="p-0"
                variant="outline-success"
                @click.stop="$emit('complete', task)"
                @keyup.enter.stop.prevent="$emit('complete', task)">
                <b-icon icon="check" size="2x"></b-icon>
              </b-button>
            </div>
          </div>
        </b-card-footer>
      </b-card>
    </div>
  </div>
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
