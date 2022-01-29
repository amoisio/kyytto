<template>
  <div class="current-stack card p-2">
    <div class="row">
      <div class="col-12">
        <h3>Active stack : {{ stack?.name }}</h3>
      </div>
    </div>
    <div class="row" v-if="stack?.description">
      <div class="col-12">
        {{ stack?.description }}
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        Filters: <div class="badge bg-danger" v-for="tag of stack?.tags" :key="tag.id">{{ tag.name }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NotificationService } from '@/shared/notification-service';
  import { Stack } from '../stacks/stack-models';

  export default defineComponent({
    name: 'CurrentStack',
    props: {
      modelValue: {
        type: Stack,
        required: false
      }
    },
    data() {
      return {
        stack: this.modelValue?.copy()
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
