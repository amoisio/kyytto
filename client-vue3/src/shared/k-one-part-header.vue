<template>
  <div class="row section-header">
    <div class="col-12">
      <slot name="header">
        <h2><slot></slot></h2>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'KOnePartHeader'
  });
</script>
