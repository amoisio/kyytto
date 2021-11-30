<template>
  <button class="new-project-button" @click="showNewProjectForm">
    <!-- <font-awesome-icon icon="plus-square" fixed-width size="2x"></font-awesome-icon> -->
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
