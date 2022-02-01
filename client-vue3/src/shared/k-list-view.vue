<template>
  <k-table-view 
    class="my-5"
    :title="title"
    :items="items" 
    :display="display" 
    :columns="columns" 
    @new="navigateToEditForm"
    @action="navigateToEditForm">
  </k-table-view>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { NotificationService } from '@/shared/notification-service';
  import { Identifiable, Identifier } from 'kyytto-models';
  import KTableView from '@/shared/k-table-view.vue';

  export default defineComponent({
    name: 'KListView',
    components: {
      KTableView
    },
    props: {
      allQuery: {
        type: Function as PropType<() => Promise<Identifiable[]>>,
        required: true
      },
      title: {
        type: String,
        default: ''
      },
      display: {
        type: String,
        required: true,
        default: 'name'
      },
      columns: {
        type: Array as PropType<string[]>,
        default: () => []
      },
      form: {
        type: String,
        required: true
      }
    },
    async created() {
      try {
        this.items = await this.allQuery();
      } catch (e) {
        this.notificationService.notifyError(`Loading ${this.title.toLocaleLowerCase()} failed.`, 'Error', e); 
      }
    },
    data() {
      return {
        items: [] as Identifiable[]
      };
    },
    computed: {
      notificationService(): NotificationService {
        return this.$services.notificationService;
      }
    },
    methods: {
      async navigateToEditForm(item?: Identifiable): Promise<void> {
        const id = item?.id ?? Identifier.nil;
        await this.$router.push({ name: this.form, params: { id: id } });
      }
    }
  });
</script>
<style lang="scss">
  
</style>
