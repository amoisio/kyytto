<template>
  <div class="container pb-2">
    <div class="row py-3 align-items-center">
      <div class="col-10">
        <k-page-header>{{ title }}</k-page-header>
      </div>
      <div class="col-2 text-end">
        <k-button-success icon="plus" @activate="$emit('new')"></k-button-success>
      </div>
    </div>
    <div class="row mb-1 align-items-center" v-for="item of items" :key="item">
      <div class="col-10">
        <h2>{{ item[display] }}</h2>
        <p v-for="column of columns">{{ item[column] }}</p>
      </div>
      <div class="col-2 text-end">
        <k-button icon="pencil" @activate="$emit('action', item)"></k-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import KPageHeader from '@/shared/k-page-header.vue';
  import KButton from '@/shared/k-button.vue';
  import KButtonSuccess from '@/shared/k-button-success.vue';

  export default defineComponent({
    name: 'KTableView',
    emits: ['action', 'new'],
    components: {
      KPageHeader,
      KButton,
      KButtonSuccess
    },
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
