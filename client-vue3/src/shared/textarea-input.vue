<template>
  <div>
    <label :for="id" class="form-label">
      <slot></slot>
    </label>
    <textarea
      :id="id"
      class="form-control"
      :rows="rows"
      v-model="value"
      :ref="id"
      :placeholder="placeholder"></textarea>
  </div>
</template>
<script lang="ts">
  import { v4 as uuid } from 'uuid';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'TextareaInput',
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
      placeholder: String,
      rows: {
        type: Number,
        default: 5
      }
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