<template>
  <k-table-view 
    class="stacks my-5"
    title="Stacks"
    :items="stacks" 
    display="name" 
    :columns="['description']" 
    @new="navigateToEditForm"
    @action="navigateToEditForm">
  </k-table-view>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NotificationService } from '@/shared/notification-service';
  import { Identifier } from 'k-models';
  import { Stack } from './stack-models';
  import KTableView from '@/shared/k-table-view.vue';

  export default defineComponent({
    name: 'StackListView',
    components: {
      KTableView
    },
    async created() {
      try {
        this.stacks = await this.$services.stackService.getAll();
      } catch (e) {
        this.notificationService.notifyError(`Loading stacks failed.`, 'Error', e); 
      }
    },
    data() {
      return {
        stacks: [] as Stack[]
      };
    },
    computed: {
      notificationService(): NotificationService {
        return this.$services.notificationService;
      }
    },
    methods: {
      async navigateToEditForm(stack?: Stack): Promise<void> {
        const id = stack?.id ?? Identifier.nil;
        await this.$router.push({ name: 'stack-form', params: { id: id } });
      }
    }
  });
</script>
<style lang="scss">
  
</style>
