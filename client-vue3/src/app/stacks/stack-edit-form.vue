<template>
  <form autocomplete="off">
    <text-input v-model="stack.name" id="stack-name" class="mb-3" placeholder="Stack name">Name</text-input>
    <textarea-input
      v-model="stack.description"
      id="stack-description"
      class="mb-3"
      :rows=10
      placeholder="Stack description">Description</textarea-input>
  </form>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Stack } from './stack-models';
  import TextareaInput from '@/shared/textarea-input.vue';
  import TextInput from '@/shared/text-input.vue';

  export default defineComponent({
    name: 'StackEditForm',
    components: {
      TextInput,
      TextareaInput
    },
    emits: ['update:modelValue'],
    props: {
      modelValue: {
        type: Object as PropType<Stack>,
        required: true
      }
    },
    data() {
      return {
        stack: this.modelValue.copy()
      };
    },
    watch: {
      stack: {
        handler(newValue: Stack) {
          this.$emit('update:modelValue', newValue);
        },
        deep: true
      }
    }
  });
</script>

