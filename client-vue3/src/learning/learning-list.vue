<template>
  <learning-item
    v-for="note in activeNotes"
    :key="note.href"
    :item="note"
    @archive="onArchive(note)"
    @select="onSelect(note)"></learning-item>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { LearningNote } from './learning-note';
import LearningItem from './learning-item.vue';
export default defineComponent({
  name: 'LearningList',
  emits: ['archive', 'select'],
  components: {
    LearningItem
  },
  props: {
    items: {
      type: Array as PropType<LearningNote[]>,
      required: true
    }
  },
  computed: {
    activeNotes(): LearningNote[] {
      return this.items.filter(item => !item.isArchived);
    }
  },
  methods: {
    onArchive(note: LearningNote) {
      this.$emit('archive', note);
    },
    onSelect(note: LearningNote) {
      this.$emit('select', note);
    }
  }
});
</script>
<style scoped>
</style>
