<template>
  <k-table 
    class="tags my-5"
    title="Tags"
    :items="tags" 
    display="name" 
    :columns="['description']" 
    @new="show = !show;"
    @action="remove"
    button-class="btn-outline-danger"
    button-icon="x-circle">

    <template v-slot:inline-form>
      <div class="row py-3" v-if="show">
        <p>Inline form comes here</p>
      </div>
    </template>

    <template v-slot:item="{ display: display }">
      <span class="fs-4">{{ display }}</span>
    </template>
  </k-table>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NotificationService } from '@/shared/notification-service';
  import { Identifier } from 'kyytto-models';
  import KTable from '@/shared/k-table.vue';
  import { Tag } from './tag-models';

  export default defineComponent({
    name: 'TagListView',
    components: {
      KTable
    },
    async created() {
      try {
        this.tags = await this.$services.tagService.getAll();
      } catch (e) {
        this.notificationService.notifyError(`Loading tags failed.`, 'Error', e); 
      }
    },
    data() {
      return {
        tags: [] as Tag[],
        show: false
      };
    },
    computed: {
      notificationService(): NotificationService {
        return this.$services.notificationService;
      }
    },
    methods: {
      async navigateToEditForm(tag?: Tag): Promise<void> {
        const id = tag?.id ?? Identifier.nil;
        await this.$router.push({ name: 'tag-form', params: { id: id } });
      },
      async remove(item: Tag): Promise<void> {
        const id = item.id;
        if (!Identifier.isValid(id)) {
          this.notificationService.notifyWarning(`Unable to remove tag. Id ${id} is invalid.`);
          return;
        }

        try {
          const index = this.tags.findIndex(t => t.id == id);
          this.tags.splice(index, 1);
          await this.$services.tagService.delete(id);
          this.notificationService.notifySuccess('Tag removed.');
        } catch (e) {
          this.notificationService.notifyError('Remove failed.', 'Error', e);
        }
      },
    }
  });
</script>
<style lang="scss">
  
</style>
