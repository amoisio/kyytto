<template>
  <button class="button-primary" @click="showNewProjectForm">
    <font-awesome-icon icon="plus" fixed-width size="lg"></font-awesome-icon>
    New project
  </button>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'NewProjectButton',
    emits: ['new'],
    methods: {
      showNewProjectForm() {
        this.$emit('new');
      }
    }
  });
</script>
