<template>
  <section class="note">
    <span class="desc">
    {{ item.description }}
    </span>
    <button @click="complete">
      <font-awesome-icon icon="check" fixed-width size="lg"></font-awesome-icon>
    </button>
  </section>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { TodoNote } from './todo-note';
  export default defineComponent({
    name: 'TodoItem',
    emits: ['complete'],
    props: {
      item: {
        type: TodoNote,
        required: true
      }
    },
    methods: {
      complete() {
        this.$emit('complete', this.item);
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
