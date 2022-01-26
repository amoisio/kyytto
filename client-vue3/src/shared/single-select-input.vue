<template>
  <div>
    <label :for="id" class="form-label">
      <slot></slot>
    </label>
    <vue-multiselect
      :id="id"
      v-model="value"
      :options="options"
      :track-by="trackBy"
      :label="label"
      :placeholder="placeholder">
    </vue-multiselect>
  </div>
</template>
<script lang="ts">
  import { v4 as uuid } from 'uuid';
  import VueMultiselect from 'vue-multiselect';
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    name: 'SingleSelectInput',
    components: {
      VueMultiselect
    },
    emits: ['update:modelValue'],
    props: {
      modelValue: {
        type: Object as PropType<any>,
        required: true
      },
      options: {
        type: Array,
        required: true
      },
      id: {
        type: String,
        default: () => `input-${uuid()}`
      },
      placeholder: String,
      trackBy: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      }
    },
    computed: {
      value: {
        get(): Object {
          return JSON.parse(JSON.stringify(this.modelValue));
        },
        set(newValue: any): void {
          this.$emit('update:modelValue', newValue);
        }
      }
    }
  });
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
