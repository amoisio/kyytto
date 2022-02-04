<template>
  <h2>
    <slot></slot>
  </h2>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'KSectionHeader'
  });
</script>
