<template>
  <vue-multiselect 
    :model-value="selectedId" 
    @select="select"
    :options="optionIds"
    track-by="name"
    label="name">
    </vue-multiselect>
</template>
<script lang="ts">
  import { IdentifierType } from 'kyytto-models';
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
    data() {
      return {
        selectedId: this.modelValue.id,
        optionIds: this.options.map(o => o.id)
      }
    },
    methods: {
      select(selectedId: IdentifierType) {
        this.selectedId = selectedId;
        const selected = this.options.find(o => o.id === selectedId);
        this.$emit('update:modelValue', selected);
      }
    }
  });
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
