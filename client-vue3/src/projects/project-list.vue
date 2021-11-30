<template>
  <div class="project-list">
    <div class="project-list-header">
      <div class="project-list-title">
        <h1>Projects</h1>
      </div>
      <div class="project-list-add">
        <new-project-button @new="$emit('new')"></new-project-button>
      </div>
    </div>
    <project-item v-for="project of projects" :project="project" :key="project.href" @edit="$emit('edit', project)">
    </project-item>
  </div>
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
<style lang="scss">
  @use '../defaults';

  .project-list-header {
    width: 100%;
    margin-bottom: 10px;

    .project-list-title {
      display: inline-block;
      h1 {
        margin: 0;
      }
    }

    .project-list-add {
      margin-top: 4px;
      float: right;
    }
  }
  
  .new-project-button {
    float: right;
  }
</style>
