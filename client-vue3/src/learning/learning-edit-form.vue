<template>
  <div class="inline-button">
    {{ modelValue }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { LearningNote } from './learning-note';
export default defineComponent({
  name: 'LearningEditForm',
  props: {
    modelValue: {
      type: LearningNote,
      required: true
    }
  }
});
</script>
<style scoped>
  .inline-button {
    width: 100%;
    padding: 0px;
    margin: 0px;
  }

  input {
    border: 1px solid #006666;
    padding: 6px 6px 5px 6px;
    margin-bottom: 4px;
    margin-right: -1px;
    border-right-color: transparent;
    width: 80%;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
    font-size: medium;
    color: black;
    display: inline-block;
  }

  button {
    border: solid;
    border-width: 1px;
    border-color: #006666;
    border-radius: 0;
    width: 20%;
    font-size: 1em;
    font-weight: 400;
    color: #006666;
    padding-top: 4px;
    padding-bottom: 4px;
    display: inline-block;
  }
</style>
