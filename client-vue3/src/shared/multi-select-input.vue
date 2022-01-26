<template>
  <div>
    <label :for="id" class="form-label">
      <slot></slot>
    </label>
    <vue-multiselect
      :multiple="true"
      :id="id"
      v-model="value"
      :options="options"
      :track-by="trackBy"
      :label="label"
      :taggable="taggable"
      @tag="$emit('tag')"
      :close-on-select="false"
      :placeholder="placeholder">
    </vue-multiselect>
  </div>
</template>
<script lang="ts">
  import { v4 as uuid } from 'uuid';
  import VueMultiselect from 'vue-multiselect';
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    name: 'MultiSelectInput',
    components: {
      VueMultiselect
    },
    emits: ['update:modelValue', 'tag'],
    props: {
      modelValue: {
        type: Array as PropType<any[]>,
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
      },
      taggable: {
        type: Boolean,
        default: false
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
