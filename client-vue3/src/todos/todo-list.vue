<template>
  <todo-item
    v-for="note in incompleteNotes"
    :key="note.href"
    :item="note"
    @complete="onComplete(note)"></todo-item>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TodoNote } from './todo-note';
import TodoItem from './todo-item.vue';
export default defineComponent({
  name: 'TodoList',
  emits: ['complete'],
  components: {
    TodoItem
  },
  props: {
    items: {
      type: Array as PropType<TodoNote[]>,
      required: true
    }
  },
  computed: {
    incompleteNotes(): TodoNote[] {
      return this.items.filter(item => !item.done);
    }
  },
  methods: {
    onComplete(note: TodoNote) {
      this.$emit('complete', note);
    }
  }
});
</script>
<style scoped>
</style>
