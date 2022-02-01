<template>
  <k-badge v-for="tag of tags" :key="tag.id" class="me-1">{{ tag.name }}</k-badge>  
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Tag } from '@/app/tags/tag-models';
  import KBadge from '@/shared/k-badge.vue';

  export default defineComponent({
    name: 'KTagList',
    components: {
      KBadge
    },
    props: {
      tags: {
        type: Array as PropType<Tag[]>,
        required: true
      }
    }
  });
</script>
