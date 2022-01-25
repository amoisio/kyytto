<template>
  <div class="row mt-2 mb-2">
    <div class="col-auto">
      <button class="btn btn-outline-primary position-relative" @click="$emit('edit')">
        <span class="fs-5">Edit</span>
      </button>
    </div>
    <div class="col align-self-center">
      <span class="fs-3">{{ stack.name }}</span>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Stack } from './stack-models';

  export default defineComponent({
    name: 'StackItem',
    emits: ['edit'],
    props: {
      stack: {
        type: Object as PropType<Stack>,
        required: true
      }
    }
  });
</script>
<style lang="scss">
  @use '@/app/custom';
  .badge {
    border: custom.$border;
  }
</style>
