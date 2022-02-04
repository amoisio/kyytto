<template>
  <k-tag v-for="tag of tags" :key="tag.id" class="me-1">{{ tag.name }}</k-tag>  
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Tag } from '@/app/tags/tag-models';
  import KTag from '@/shared/k-tag.vue';

  export default defineComponent({
    name: 'KTagList',
    components: {
      KTag
    },
    props: {
      tags: {
        type: Array as PropType<Tag[]>,
        required: true
      }
    }
  });
</script>
