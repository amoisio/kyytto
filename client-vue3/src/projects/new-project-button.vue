<template>
  <button class="button-primary" @click="showNewProjectForm">New Project</button>
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
