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
<style lang="scss">
  @import '@/assets/baseStyles.scss';

  .new-project-button  {
    color: $russian-violet;
    width: 100%;
    margin-top: $default-margin;
    background-color: $chinese-violet;
    text-align:left;
    border: 2px solid $english-violet;
    border-radius: 20px;

    text-align: center;
    text-decoration: none;
    width: 100%;

    &:focus {
      outline: none;
    }

    &:hover,
    &:focus,
    &.active {
      background-color: $lavender-gray;
      color: $russian-violet;
    }
  }
</style>
