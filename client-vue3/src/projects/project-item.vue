<template>
  <div class="row mt-2 mb-2">
    <div class="col-auto">
      <button class="btn btn-outline-primary position-relative" @click="$emit('edit')">
        <span class="fs-5">Edit</span>
        <bordered-icon 
          class="top-0 start-100 translate-middle"
          icon="tag"
          scale="2"
          :color="project.color"
          border-color="black">
        </bordered-icon>
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
  import BorderedIcon from '@/lib/bordered-icon.vue';

  export default defineComponent({
    name: 'ProjectItem',
    emits: ['edit'],
    components: {
      BorderedIcon
    },
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
