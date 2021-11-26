<template>
  <p>
    Welcome to projects page!
    {{ count }}
  </p>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  // import { TodoNote, INewTodoNote } from './todo-note';
  // import TodoAddForm from './todo-add-form.vue';
  // import TodoList from './todo-list.vue';
  import { ProjectService, IProjectService } from './project-service';

  export default defineComponent({
    name: 'ProjectsView',
    components: {
      // TodoAddForm,
      // TodoList
    },
    created() {
      // this.items = this.service.getNotes();
    },
    computed: {
      service(): IProjectService {
        return new ProjectService();
      },
      count(): number {
        return this.service.getAll().length;
      }
    },
    data() {
      return {
        // items: [] as TodoNote[]
      };
    }
    // methods: {
    //   onAdd(newItem: INewTodoNote) {
    //     const item = this.service.create(newItem);
    //     this.items.push(item);
    //   },
    //   onComplete(item: TodoNote) {
    //     item.done = true;
    //   }
    // }
  });
</script>
