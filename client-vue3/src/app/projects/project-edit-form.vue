<template>
  <form autocomplete="off">
    <div class="mb-3">
      <label for="project-name" class="form-label">Name</label>
      <input
        type="text"
        class="form-control"
        id="project-name"
        v-model="project.name"
        ref="name"
        placeholder="Project name"
      />
    </div>
    <div class="mb-3">
      <label for="project-description" class="form-label">Description</label>
      <textarea
        id="project-description"
        class="form-control"
        rows="5"
        v-model="project.description"
        ref="description"
        placeholder="Project description"
      />
    </div>
  </form>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Project } from './project-models';

  export default defineComponent({
    name: 'ProjectEditForm',
    emits: ['update:modelValue'],
    props: {
      modelValue: {
        type: Object as PropType<Project>,
        required: true
      }
    },
    data() {
      return {
        project: this.modelValue.copy()
      };
    },
    mounted() {
      this.focusOnName();
    },
    methods: {
      focusOnName() {
        const input = this.$refs.name as HTMLElement;
        input.focus();
      }
    },
    watch: {
      item: {
        handler(newValue: Project) {
          this.$emit('update:modelValue', newValue);
        },
        deep: true
      }
    }
  });
</script>
<style lang="scss">
  .hidden {
    position: absolute;
    width: 0px;
    height: 0px;
    overflow: hidden;
    z-index: -10;
  }
</style>
