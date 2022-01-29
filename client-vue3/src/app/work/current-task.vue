<template>
  <div class="current-stack card p-2">
    <div class="row">
      <div class="col-12">
        <h3>{{ task?.title }}</h3>
      </div>
    </div>
    <div class="row" v-if="task?.description">
      <div class="col-12">
        <span v-html="task?.description"></span>
      </div>
    </div>
    <div class="row" v-if="task?.isBug">
      <div class="col-12">
        <bordered-icon icon="bug" scale="2" color="#ff0000" border-color="black"></bordered-icon>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="badge bg-danger" v-for="tag of task?.tags" :key="tag.id">{{ tag.name }}</div>
      </div>
    </div>
    <div class="row py-3 justify-content-between">
      <div class="col-auto text-end">
        <button
          type="button"
          @click="task?.stopWork()"
          class="btn btn-outline-primary me-2">Stop</button>
        <button
          type="button"
          @click="task?.complete()"
          class="btn btn-outline-success">Complete</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NotificationService } from '@/shared/notification-service';
  import { Task } from '../tasks/task-models';
  import BorderedIcon from '../../shared/bordered-icon.vue';

  export default defineComponent({
    name: 'CurrentTask',
    components: {
      BorderedIcon
    },
    props: {
      modelValue: {
        type: Task,
        required: false
      }
    },
    data() {
      return {
        task: this.modelValue?.copy()
      };
    },
    computed: {
      notifier(): NotificationService {
        return this.$services.notificationService;
      }
    },
    async created() {
      try {
      } catch (e) {
        this.notifier.notifyError(`Loading work view failed.`, 'Error', e);
      } finally {
      }
    },
    methods: {
    }
  });
</script>
