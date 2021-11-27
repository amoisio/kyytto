<template>
  <section class="project-item">
    <p class="project-name">{{ project.name }}</p>
    <p class="project-description">{{ project.description }}</p>
    <div class="project-controls">
      <button @click="edit">Edit</button>
      <button @click="remove">Delete</button>
    </div>
  </section>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { IProject } from './project';

  export default defineComponent({
    name: 'ProjectItem',
    props: {
      project: {
        type: Object as PropType<IProject>,
        required: true
      }
    },
    methods: {
      edit() {
        this.$emit('edit', this.project);
      },
      remove() {
        this.$emit('remove', this.project);
      }
    }
  });
</script>
<style lang="scss">
  @import '@/assets/baseStyles.scss';

  .project-item {
    border: 2px solid $chinese-violet;
    border-radius: 10px;

    button {
      border: 2px solid $chinese-violet;
      border-radius: 10px;
      width: 20%;
      font-size: 1em;
      font-weight: 400;
      color: white;
      background-color: $chinese-violet;
      padding-top: 4px;
      padding-bottom: 4px;
    }

    .project-name {
      font-size: larger;
      font-weight: bolder;
    }

    .project-description {
      font-weight: normal;
    }
  }
</style>
