<template>
  <k-table 
    class="stacks my-5"
    title="Stacks"
    :items="stacks" 
    display="name" 
    :columns="['description']" 
    @new="navigateToEditForm"
    @action="navigateToEditForm">
  </k-table>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NotificationService } from '@/shared/notification-service';
  import { Identifier } from 'kyytto-models';
  import { Stack } from './stack-models';
  import KTable from '@/shared/k-table.vue';

  export default defineComponent({
    name: 'StackListView',
    components: {
      KTable
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
