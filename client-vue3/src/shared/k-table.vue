<template>
  <div class="container pb-2">
    <div class="row py-3">
      <div class="col-10">
        <span class="fs-3 text-capitalize fw-bold">{{ title }}</span>
      </div>
      <div class="col-2 text-end">
        <button class="btn btn-default" @click="$emit('new')" alt="New">
          <b-icon icon="plus-circle" size="2x"></b-icon>
        </button>
      </div>
    </div>
    <div class="row py-3" v-for="item of items" :key="item">
      <div class="col-10">
        <span class="fs-4">{{ item[display] }}</span>
        <template v-for="column of columns">
          <br />
          <span>{{ item[column] }}</span>
        </template>
      </div>
      <div class="col-2 text-end">
        <button class="btn btn-default" @click="$emit('edit', item)" alt="Edit">
          <b-icon icon="pencil" size="2x"></b-icon>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    name: 'KTable',
    emits: ['edit', 'remove', 'new'],
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
