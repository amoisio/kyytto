<template>
  <h1>
    <slot></slot>
  </h1>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'KPageHeader'
  });
</script>
