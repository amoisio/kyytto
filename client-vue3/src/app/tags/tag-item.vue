<template>
  <b-badge :variant="variant">{{ tag.name }}</b-badge>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Tag } from './tag-models';

  export default defineComponent({
    name: 'TagItem',
    props: {
      tag: {
        type: Object as PropType<Tag>,
        required: true
      },
      variant: {
        type: String,
        required: false,
        default: 'info'
      }
    }
  });
</script>
