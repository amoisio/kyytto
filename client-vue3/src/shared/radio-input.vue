<template>
  <div>
    <label class="form-label">
      <slot></slot>
    </label>
    <template v-for="option of options" :key="option"> 
      <br />
      <input type="radio" :id="option" :value="option" v-model="value" />
      <label :for="option">{{ option }}</label>
    </template>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    name: 'RadioInput',
    emits: ['update:modelValue'],
    props: {
      modelValue: {
        type: String,
        required: true
      },
      options: {
        type: Array as PropType<string[]>
      }
    },
    computed: {
      value: {
        get(): string {
          return this.modelValue;
        },
        set(newValue: string) {
          this.$emit('update:modelValue', newValue);
        }
      }
    }
  });
</script>
