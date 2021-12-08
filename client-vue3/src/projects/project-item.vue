<template>
  <div class="row mt-2 mb-2">
    <div class="col-auto">
      <button class="btn btn-outline-primary position-relative" @click="$emit('edit')">
        Edit
        <span
          class="position-absolute top-0 start-100 translate-middle">
          <b-icon icon="tag-fill" scale=2 :style="{ 'color': project.color, 'overflow': 'visible' }"></b-icon>
        </span>
      </button>
    </div>
    <div class="col align-self-center">
      <span class="fs-3">{{ project.name }}</span>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { IProject } from './project';

  export default defineComponent({
    name: 'ProjectItem',
    emits: ['edit'],
    props: {
      project: {
        type: Object as PropType<IProject>,
        required: true
      }
    }
  });
</script>
<style lang="scss">
  @use '@/custom';
  .badge {
    border: custom.$border;
  }
</style>
