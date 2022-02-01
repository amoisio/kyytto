<template>
  <div class="row section-header">
    <div class="col-6">
      <slot name="left">
        <h2><slot></slot></h2>
      </slot>
    </div>
    <div class="col-6 text-end">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'KTwoPartHeader'
  });
</script>
