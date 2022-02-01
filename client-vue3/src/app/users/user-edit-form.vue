<template>
  <form autocomplete="off">
    <text-input 
      v-model="user.name" 
      id="user-name" 
      class="mb-3" 
      placeholder="User name">Name</text-input>
    <single-select-input
      v-model="user.stack"
      id="user-stack"
      class="mb-3"
      :options="stacks"
      placeholder="Choose default stack..."
      track-by="name"
      label="name">Default stack</single-select-input>
  </form>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { User } from './user-models';
  import TextInput from '@/shared/text-input.vue';
  import SingleSelectInput from '@/shared/single-select-input.vue';
  import { Stack } from '../stacks/stack-models';

  export default defineComponent({
    name: 'UserEditForm',
    components: {
      TextInput,
      SingleSelectInput
    },
    emits: ['update:modelValue'],
    props: {
      modelValue: {
        type: Object as PropType<User>,
        required: true
      },
      stacks: {
        type: Array as PropType<Stack[]>,
        default: () => []
      } 
    },
    data() {
      return {
        user: this.modelValue.copy()
      };
    },
    watch: {
      user: {
        handler(newValue: User) {
          this.$emit('update:modelValue', newValue);
        },
        deep: true
      }
    },
  });
</script>
