<template>
  <div class="container pb-2">
    <div class="row py-3 align-items-center">
      <div class="col-10">
        <k-page-header>{{ title }}</k-page-header>
      </div>
      <div class="col-2 text-end">
        <k-button-new @activate="$emit('new')"></k-button-new>
      </div>
    </div>
    <div class="row mb-1 align-items-center" v-for="item of items" :key="item">
      <div class="col-10">
        <h2>{{ item[display] }}</h2>
        <p v-for="column of columns">{{ item[column] }}</p>
      </div>
      <div class="col-2 text-end">
        <k-button-edit @activate="$emit('action', item)"></k-button-edit>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    name: 'KTableView',
    emits: ['action', 'new'],
    props: {
      title: {
        type: String,
        required: false
      },
      items: {
        type: Array as PropType<any[]>,
        required: true
      },
      display: {
        type: String,
        required: true
      },
      columns: {
        type: Array as PropType<string[]>,
        default: () => []
      }
    }
  });
</script>
<style lang="scss">
  .container {
    background-color: white;
    filter: drop-shadow(0 0 0.2rem grey);
  }

  .bootstrap-icon {
    margin-bottom: 0 !important;
  }
</style>
