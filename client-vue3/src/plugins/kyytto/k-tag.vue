<template>
  <b-badge class="mx-1 my-1" :variant="variant">
    <slot></slot>
  </b-badge>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'KTag',
    props: {
      variant: {
        type: String,
        default: 'danger'
      }
    }
  });
</script>
