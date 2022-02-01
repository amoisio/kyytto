<template>
  <div class="badge bg-danger m-0">
    <slot></slot>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'KBadge'
  });
</script>
