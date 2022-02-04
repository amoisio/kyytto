<template>
  <k-tag v-for="tag of tags" :key="tag" class="me-1">{{ tag }}</k-tag>  
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import KTag from './k-tag.vue';

  export default defineComponent({
    name: 'KTagList',
    components: {
      KTag
    },
    props: {
      tags: {
        type: Array as PropType<string[]>,
        required: true
      }
    }
  });
</script>
