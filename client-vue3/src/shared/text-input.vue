<template>
  <div>
    <label :for="id" class="form-label">
      <slot></slot>
    </label>
    <input
      type="text"
      class="form-control"
      :id="id"
      v-model="value"
      :ref="id"
      :placeholder="placeholder"
    />
  </div>
</template>
<script lang="ts">
  import { v4 as uuid } from 'uuid';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'TextInput',
    emits: ['update:modelValue'],
    props: {
      modelValue: {
        type: String,
        required: true
      },
      id: {
        type: String,
        default: () => `input-${uuid()}`
      },
      placeholder: String
    },
    data() {
      return {
        value: this.modelValue
      };
    },
    watch: {
      value: {
        handler(newValue: string) {
          this.$emit('update:modelValue', newValue);
        }
      }
    }
  });
</script>
