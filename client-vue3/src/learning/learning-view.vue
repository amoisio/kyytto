<template>
  <learning-edit-form v-if="selectedItem !== undefined" v-model="selectedItem"></learning-edit-form>
  <learning-add-form v-else @add="onAdd"></learning-add-form>
  <learning-list :items="items" @archive="onArchive" @select="onSelect"></learning-list>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { LearningNote, INewLearningNote } from './learning-note';
import LearningAddForm from './learning-add-form.vue';
import LearningEditForm from './learning-edit-form.vue';
import LearningList from './learning-list.vue';

export default defineComponent({
  name: 'LearningView',
  components: {
    LearningAddForm,
    LearningEditForm,
    LearningList
  },
  created() {
    // query todo items from back-end
    this.items = [];
  },
  data() {
    return {
      selectedItem: undefined as LearningNote | undefined,
      items: [] as LearningNote[]
    };
  },
  methods: {
    onAdd(newItem: INewLearningNote) {
      const item = this.createLearningNote(newItem);
      this.items.push(item);
    },
    onArchive(note: LearningNote) {
      note.isArchived = true;
    },
    onSelect(item: LearningNote) {
      if (this.selectedItem === item) {
        this.selectedItem = undefined;
      } else {
        this.selectedItem = item;
      }
    },
    createLearningNote(newItem: INewLearningNote): LearningNote {
      const item = new LearningNote();
      item.topic = newItem.topic;
      item.add(newItem.detail);
      item.rel = '/learning/1';
      item.href = '/learning/1';
      return item;
    }
  }
});
</script>
