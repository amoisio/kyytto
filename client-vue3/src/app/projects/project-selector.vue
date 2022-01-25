<template>
  <vue-multiselect 
    :model-value="selected" 
    @select="select"
    :options="options"
    track-by="name"
    label="name">
  </vue-multiselect>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import VueMultiselect from 'vue-multiselect';
  import { Project } from './project-models';

  export default defineComponent({
    name: 'ProjectSelector',
    components: {
      VueMultiselect
    },
    emits: ['update:modelValue'],
    props: {
      modelValue: {
        type: Object as PropType<Project>,
        required: true
      },
      options: {
        type: Array as PropType<Project[]>,
        required: true
      }
    },
    computed: {
      selected(): Project | undefined {
        const match = this.options.find(o => o.id === this.modelValue.id);
        return match;
      }
    },
    methods: {
      select(selected: Project) {
        this.$emit('update:modelValue', selected);
      }
    }
  });
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
