<template>
  <div class="work-view container pb-2 my-5" v-if="isReady">
    <div class="row py-3">
      <div class="col-12">
        <h1>Work</h1>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { NotificationService } from '@/shared/notification-service';

  export default defineComponent({
    name: 'WorkView',
    data() {
      return {
        isReady: false
      };
    },
    computed: {
      notifier(): NotificationService {
        return this.$services.notificationService;
      }
    },
    async created() {
      try {
        this.isReady = false;
      } catch (e) {
        this.notifier.notifyError(`Loading work view failed.`, 'Error', e);
      } finally {
        this.isReady = true;
      }
    },
    methods: {
    }
  });
</script>
