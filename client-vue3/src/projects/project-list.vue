<template>
  <new-project-button @new="$emit('new')"></new-project-button>
  <project-item v-for="project of projects" :project="project" :key="project.href" @edit="$emit('edit', project)">
  </project-item>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import NewProjectButton from './new-project-button.vue';
  import ProjectItem from './project-item.vue';
  import { IProject } from './project';

  export default defineComponent({
    name: 'ProjectList',
    emits: ['new', 'edit'],
    components: {
      NewProjectButton,
      ProjectItem
    },
    props: {
      projects: {
        type: Array as PropType<IProject[]>,
        required: true
      }
    }
  });
</script>
