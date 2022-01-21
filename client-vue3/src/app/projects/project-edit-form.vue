<template>
  <form autocomplete="off">
    <text-input v-model="project.name" id="project-name" class="mb-3" placeholder="Project name">Name</text-input>
    <textarea-input
      v-model="project.description"
      id="project-description"
      class="mb-3"
      :rows=10
      placeholder="Project description">Description</textarea-input>
  </form>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Project } from './project-models';
  import TextareaInput from '@/shared/textarea-input.vue';
  import TextInput from '@/shared/text-input.vue';

  export default defineComponent({
    name: 'ProjectEditForm',
    components: {
      TextInput,
      TextareaInput
    },
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
    watch: {
      project: {
        handler(newValue: Project) {
          this.$emit('update:modelValue', newValue);
        },
        deep: true
      }
    }
  });
</script>

