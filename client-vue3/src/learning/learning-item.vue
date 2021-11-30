<template>
  <section class="note">
    <span class="desc">
    {{ item.topic }}
    </span>
    <button @click="archive">
      <font-awesome-icon icon="check" fixed-width size="lg"></font-awesome-icon>
    </button>
    <button @click="select">
      <font-awesome-icon icon="check" fixed-width size="lg"></font-awesome-icon>
    </button>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { LearningNote } from './learning-note';
export default defineComponent({
  name: 'LearningItem',
  emits: ['archive', 'select'],
  props: {
    item: {
      type: LearningNote,
      required: true
    }
  },
  methods: {
    archive() {
      this.$emit('archive', this.item);
    },
    select() {
      this.$emit('select', this.item);
    }
  }
});
</script>
<style scoped>
  .note {
    font-family: Arial, Helvetica, sans-serif;
    color: #006666;
    width: 100%;
    margin-bottom: 4px;
  }
  .desc {
    display: inline-block;
    width: 80%;
    margin-right: -1px;
    vertical-align: middle;
  }
  button {
    border: solid;
    border-width: 1px;
    border-color: #006666;
    border-radius: 0;
    font-size: 1em;
    font-weight: 400;
    color: #006666;
    padding-top: 4px;
    padding-bottom: 4px;
    text-align: end;
    width:20%;
    text-align: center;
    display: inline-block;
    vertical-align: baseline;
  }
</style>
