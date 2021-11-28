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
<style lang="scss">
  @import '@/assets/baseStyles.scss';

  .project-item  {
    color: $russian-violet;
    width: 100%;
    margin-top: $default-margin;
    background-color: $heliotrope-gray;
    text-align:left;
    border: 2px solid $english-violet;
    border-radius: 20px;
    &:focus {
      outline: none;
    }

    &:hover,
    &:focus,
    &.active {
      background-color: $lavender-gray;
      color: $english-violet;
    }
  }

  .project-color {
    display: inline-flex;
    margin-right: 4px;
    width: 20px;
    border: 2px solid $english-violet;
    border-radius: 20px;
  }

  .project-name {
    position: relative;
    display: inline-flex;
  }
</style>
