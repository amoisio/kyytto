<template>
  <todo-add-form @add="onAdd"></todo-add-form>
  <todo-list :items="items" @complete="onComplete"></todo-list>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import { TodoNote, INewTodoNote } from './todo-note';
import TodoAddForm from './todo-add-form.vue';
import TodoList from './todo-list.vue';
import { ITodoService } from './todo-service';

export default defineComponent({
  name: 'Todo View',
  components: {
    TodoAddForm,
    TodoList
  },
  created() {
    this.items = this.service.getNotes();
  },
  computed: {
    service(): ITodoService {
      return inject('todoService') as ITodoService;
    }
  },
  data() {
    return {
      items: [] as TodoNote[]
    };
  },
  methods: {
    onAdd(newItem: INewTodoNote) {
      const item = this.service.create(newItem);
      this.items.push(item);
    },
    onComplete(item: TodoNote) {
      item.done = true;
    }
  }
});
</script>
