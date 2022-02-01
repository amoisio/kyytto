<template>
  <k-table-view 
    class="tags my-5"
    title="Tags"
    :items="sortedUsages" 
    display="name" 
    @new="show = !show;"
    @action="remove"
    button-class="btn-outline-danger"
    button-icon="x-circle">

    <template v-slot:inline-form>
      <div class="row justify-content-between py-3" v-if="show">
        <div class="col-4">
          <text-input 
            v-model="name" 
            id="tag-name" 
            :hide-label="true"
            placeholder="New tag name"></text-input>
        </div>
        <div class="col-2 text-end">
          <button type="button" @click="save" class="btn btn-outline-success" alt="Save">
            <b-icon icon="save" size="lg"></b-icon>
          </button>
        </div>
      </div>
    </template>

    <template v-slot:body="{ item: item }">
      <div class="col-10">
        <span class="fs-4 pr-2">{{ item[0]['name'] }}</span>
      </div>
      <div class="col-2 text-end align-middle">
        <span class="badge bg-danger fs-6" v-if="item[1] > 0">{{ item[1] }} uses</span>
        <button class="btn btn-outline-danger" v-else @click="remove(item[0])">
          <b-icon icon="x-circle" size="lg"></b-icon>
        </button>
      </div>
    </template>
  </k-table-view>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { NotificationService } from '@/shared/notification-service';
  import { Identifier, Utilities } from 'kyytto-models';
  import KTableView from '@/shared/k-table-view.vue';
  import { Tag } from './tag-models';
  import TextInput from '@/shared/text-input.vue';

  export default defineComponent({
    name: 'TagListView',
    components: {
      KTableView,
      TextInput
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
        usages: [] as [tag: Tag , count: number][],
        show: false,
        name: ''
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
