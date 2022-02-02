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
          <k-button-success v-if="show" icon="arrow-down-short" @activate="save"></k-button-success>
          <k-button v-if="show" icon="arrow-left-short" @activate="show = false;"></k-button>
          <k-button-success v-else icon="plus" @activate="show = true;"></k-button-success>
        </div>
      </div>
    </div>
    <div class="row mb-1 align-items-center" v-for="usage of sortedUsages" :key="usage[0].id">
      <div class="col-10">
        <span class="fs-4 pr-2">{{ usage[0].name }}</span>
      </div>
      <div class="col-2 text-end align-middle">
        <span class="badge bg-danger fs-6" v-if="usage[1] > 0">{{ usage[1] }} uses</span>
        <k-button-danger icon="x" @activate="remove(usage[0])" v-else></k-button-danger>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NotificationService } from '@/shared/notification-service';
  import { Identifier, Utilities } from 'kyytto-models';
  import KTableView from '@/shared/k-table-view.vue';
  import { Tag } from './tag-models';
  import TextInput from '@/shared/text-input.vue';
  import KPageHeader from '@/shared/k-page-header.vue';
  import KButton from '@/shared/k-button.vue';
  import KButtonSuccess from '@/shared/k-button-success.vue';
  import KButtonDanger from '@/shared/k-button-danger.vue';

  export default defineComponent({
    name: 'TagListView',
    components: {
      KTableView,
      TextInput,
      KButton,
      KButtonSuccess,
      KPageHeader,
      KButtonDanger
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
