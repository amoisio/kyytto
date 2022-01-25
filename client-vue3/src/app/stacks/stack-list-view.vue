<template>
  <div class="stacks">
    <div class="row pb-3 pt-3">
      <div class="col-auto">
        <h1>Stacks</h1>
      </div>
      <div class="col align-self-center">
        <button id="new-stack" class="btn btn-outline-primary" @click="navigateToEditForm()">
          <span class="fs-5">New stack</span>
        </button>
      </div>
    </div>
    <div class="row" v-for="stack of stacks" :key="stack.id">
      <div class="col-12 col-md-6">
        <stack-item :stack="stack" @edit="navigateToEditForm(stack)"></stack-item>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NotificationService } from '@/shared/notification-service';
  import { Identifier } from 'kyytto-models';
  import { Stack } from './stack-models';
  import StackItem from './stack-item.vue';

  export default defineComponent({
    name: 'StackListView',
    components: {
      StackItem
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
