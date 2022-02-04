<template>
  <k-button 
    variant="outline-success" 
    icon="arrow-down-short"
    :size="size"
    @activate="$emit('activate')"></k-button>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import KButton from './k-button.vue';
  export default defineComponent({
    name: 'KButtonSave',
    components: {
      KButton
    },
    emits: ['activate'],
    props: {
      size: {
        type: String,
        default: '2x'
      }
    }
  });
</script>
