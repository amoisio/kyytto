<template>
  <todo-add-form @add="onAdd"></todo-add-form>
  <todo-list :items="items" @complete="onComplete"></todo-list>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { TodoNote, INewTodoNote } from './todo-note';
  import TodoAddForm from './todo-add-form.vue';
  import TodoList from './todo-list.vue';

  export default defineComponent({
    name: 'Todo View',
    components: {
      TodoAddForm,
      TodoList
    },
    created() {
      // query todo items from back-end
      this.items = [];
    },
    data() {
      return {
        selectedItem: undefined as TodoNote | undefined,
        items: [] as TodoNote[]
      };
    },
    methods: {
      onAdd(newItem: INewTodoNote) {
        const item = this.createTodoNote(newItem);
        this.items.push(item);
      },
      onComplete(item: TodoNote) {
        item.done = true;
      },
      createTodoNote(newItem: INewTodoNote): TodoNote {
        const item = new TodoNote();
        item.description = newItem.description;
        item.done = false;
        item.rel = '/todos/1';
        item.href = '/todos/1';
        return item;
      }
    }
  });
</script>
