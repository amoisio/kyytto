<template>
  <k-button 
    variant="outline-success" 
    :icon="icon"
    :size="size"
    @activate="$emit('activate')"></k-button>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import KButton from './k-button.vue';
  export default defineComponent({
    name: 'KButtonSuccess',
    components: {
      KButton
    },
    emits: ['activate'],
    props: {
      icon: {
        type: String,
        required: true
      },
      size: {
        type: String,
        default: '2x'
      }
    }
  });
</script>
