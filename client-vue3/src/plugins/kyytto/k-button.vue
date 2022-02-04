<template>
  <b-button
    class="p-1 mx-0 my-0"
    :variant="variant"
    @click.stop="$emit('activate')"
    @keyup.enter.stop.prevent="$emit('activate')">
    <b-icon :icon="icon" :size="size"></b-icon>
  </b-button>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'KButton',
    emits: ['activate'],
    props: {
      icon: {
        type: String,
        required: true
      },
      size: {
        type: String,
        default: '2x',
      },
      variant: {
        type: String,
        default: 'outline-secondary'
      }
    }
  });
</script>
