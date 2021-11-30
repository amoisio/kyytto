<template>
  <button class="project-item" @click="$emit('edit')">
    <span class="project-color" :style="{ 'background-color': project.color }">&nbsp;</span>
    <span class="project-name">{{ project.name }}</span>
  </button>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { IProject } from './project';

  export default defineComponent({
    name: 'ProjectItem',
    emits: ['edit'],
    props: {
      project: {
        type: Object as PropType<IProject>,
        required: true
      }
    }
  });
</script>
