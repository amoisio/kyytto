<template>
  <vue-multiselect 
    :model-value="selected" 
    @select="select"
    @remove="remove"
    :options="options"
    :multiple="true"
    :taggable="true"
    @tag="tag"
    :close-on-select="false"
    track-by="name"
    label="name">
  </vue-multiselect>
</template>
<script lang="ts">
  import { Utilities } from 'k-models';
  import { defineComponent, PropType } from 'vue';  
  import VueMultiselect from 'vue-multiselect';
  import { Tag } from './tag-models';

  export default defineComponent({
    name: 'TagSelector',
    components: {
      VueMultiselect
    },
    emits: ['update:modelValue'],
    props: {
      modelValue: {
        type: Array as PropType<Tag[]>,
        required: true
      },
      options: {
        type: Object as PropType<Tag[]>,
        required: true
      }
    },
    data() {
      return {
        selected: [] as Tag[]
      }
    },
    mounted() {
      for(const current of this.modelValue) {
        this.selected.push(current.copy());
      }
    },
    methods: {
      select(selected: Tag) {
        this.selected.push(selected);
        this.$emit('update:modelValue', this.selected);
      },
      remove(removed: Tag) {
        const index = this.selected.findIndex(s => s.name === removed.name);
        this.selected.splice(index, 1);
        this.$emit('update:modelValue', this.selected);
      },
      async tag(name: string) {
        if (Utilities.isEmpty(name)) {
          this.$services.notificationService.notifyError('Tag name must be given');
          return;
        }
        try {
          const newTag = Tag.empty();
          newTag.name = name;
          const id = await this.$services.tagService.create(newTag);
          const tag = await this.$services.tagService.getById(id);
          this.selected.push(tag);
          this.options.push(tag);
          this.$emit('update:modelValue', this.selected);
        } catch (e) {
          this.$services.notificationService.notifyError(`Unable to create tag for ${name}`, 'Error', e);
        }
      }
    }
  });
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
