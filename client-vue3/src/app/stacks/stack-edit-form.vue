<template>
  <form autocomplete="off">
    <text-input 
      v-model="stack.name" 
      id="stack-name" 
      class="mb-3" 
      placeholder="Stack name">Name</text-input>
    
    <textarea-input
      v-model="stack.description"
      id="stack-description"
      class="mb-3"
      :rows=5
      placeholder="Stack description">Description</textarea-input>
    
    <multi-select-input
      v-model="stack.tags"
      id="stack-tags"
      class="mb-3"
      :options="tags"
      placeholder="Choose filters..."
      track-by="name"
      label="name">Filter</multi-select-input>

    <radio-input
      v-model="match"
      class="mb-3"
      :options="matchTypes">Match type</radio-input>
  </form>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Stack } from './stack-models';
  import TextareaInput from '@/shared/textarea-input.vue';
  import TextInput from '@/shared/text-input.vue';
  import MultiSelectInput from '@/shared/multi-select-input.vue';
  import RadioInput from '@/shared/radio-input.vue';
  import { Tag } from '../tags/tag-models';
  import { MatchType } from 'kyytto-models';

  export default defineComponent({
    name: 'StackEditForm',
    components: {
      TextInput,
      TextareaInput,
      MultiSelectInput,
      RadioInput
    },
    emits: ['update:modelValue'],
    props: {
      modelValue: {
        type: Object as PropType<Stack>,
        required: true
      },
      tags: {
        type: Array as PropType<Tag[]>,
        required: true
      },
      
    },
    data() {
      return {
        stack: this.modelValue.copy()
      };
    },
    computed: {
      match: {
        get(): string {
          return MatchType[this.stack.match].toString();
        },
        set(val: string) {
          this.stack.match = MatchType[val as keyof typeof MatchType]
        }
      },
      matchTypes(): string[] {
        return [
          MatchType[MatchType.Exact].toString(),
          MatchType[MatchType.All].toString(),
          MatchType[MatchType.Any].toString()
        ];
      }
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

