<template>
  <div class="tag-list-view container pb-2 my-5" v-if="isReady">
    <div class="row py-3 justify-content-between align-items-center">
      <div class="col-6">
        <k-page-header>Tags</k-page-header>
      </div>
      <div class="col-6">
        <div class="input-group justify-content-end">
          <text-input 
            v-if="show"
            v-model="name" 
            id="tag-name" 
            :hide-label="true"
            placeholder="New tag name"></text-input>
          <k-button-save v-if="show" @activate="save" class="mx-0"></k-button-save>
          <k-button-cancel v-if="show" @activate="show = false;" class="mx-0"></k-button-cancel>
          <k-button-new v-else @activate="show = true;"></k-button-new>
        </div>
      </div>
    </div>
    <div class="row mb-1 align-items-center" v-for="usage of sortedUsages" :key="usage[0].id">
      <div class="col-10">
        <span class="fs-4 pr-2">{{ usage[0].name }}</span>
      </div>
      <div class="col-2 text-end align-middle">
        <span class="badge bg-danger fs-6" v-if="usage[1] > 0">{{ usage[1] }} uses</span>
        <k-button-remove @activate="remove(usage[0])" v-else></k-button-remove>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NotificationService } from '@/shared/notification-service';
  import { Identifier, Utilities } from 'kyytto-models';
  import { Tag } from './tag-models';
  import TextInput from '@/shared/text-input.vue';

  export default defineComponent({
    name: 'TagListView',
    components: {
      TextInput
    },
    async created() {
      try {
        this.isReady = false;
        this.usages = await this.$services.tagService.getUserTagsAndUsages();
      } catch (e) {
        this.notificationService.notifyError(`Loading tags failed.`, 'Error', e); 
      } finally {
        this.isReady = true;
      }
    },
    data() {
      return {
        usages: [] as [tag: Tag , count: number][],
        show: false,
        name: '',
        isReady: false
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
          const index = this.usages.findIndex(t => t[0].id == id);
          this.usages.splice(index, 1);
          await this.$services.tagService.delete(id);
          this.notificationService.notifySuccess('Tag removed.');
        } catch (e) {
          this.notificationService.notifyError('Remove failed.', 'Error', e);
        }
      },
      async save() {
        if (Utilities.isEmpty(this.name)) {
          this.$services.notificationService.notifyError('Tag name must be given');
          return;
        }
        try {
          const newTag = Tag.empty();
          newTag.name = this.name;
          const id = await this.$services.tagService.create(newTag);
          const tag = await this.$services.tagService.getById(id);
          this.usages.push([tag, 0]);
          this.show = false;
          this.name = '';
        } catch (e) {
          this.$services.notificationService.notifyError(`Unable to create tag for ${this.name}`, 'Error', e);
        }
      }
    }
  });
</script>
<style lang="scss">
  
</style>
