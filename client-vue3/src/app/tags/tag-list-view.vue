<template>
  <k-table 
    class="tags my-5"
    title="Tags"
    :items="sortedUsages" 
    display="name" 
    @new="show = !show;"
    @action="remove"
    button-class="btn-outline-danger"
    button-icon="x-circle">

    <template v-slot:inline-form>
      <div class="row py-3" v-if="show">
        <p>Inline form comes here</p>
      </div>
    </template>

    <template v-slot:body="{ item: item }">
      <div class="col-10">
        <span class="fs-4 pr-2">{{ item[0]['name'] }}</span>
      </div>
      <div class="col-2 text-end align-middle">
        <span class="badge bg-danger fs-6" v-if="item[1] > 0">{{ item[1] }} uses</span>
        <button class="btn btn-outline-danger" v-else @click="$emit('action', item)">
          <b-icon icon="x-circle" size="lg"></b-icon>
        </button>
      </div>
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
        this.usages = await this.$services.tagService.getUserTagsAndUsages();
      } catch (e) {
        this.notificationService.notifyError(`Loading tags failed.`, 'Error', e); 
      }
    },
    data() {
      return {
        tags: [] as Tag[],
        usages: [] as [tag: Tag , count: number][],
        show: false
      };
    },
    computed: {
      notificationService(): NotificationService {
        return this.$services.notificationService;
      },
      sortedUsages(): [tag: Tag , count: number][]{
        return this.usages.sort((a, b) => {
          var nameA = a[0].name.toLowerCase();
          var nameB = b[0].name.toLowerCase();
          return (nameA < nameB) ? -1 
               : (nameA > nameB) ? 1 
               : 0;
        });
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
