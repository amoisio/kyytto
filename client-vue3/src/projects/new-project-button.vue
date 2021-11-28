<template>
  <button class="new-project-button" @click="showNewProjectForm">New Project</button>
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
<style lang="scss"></style>
