<template>
  <div class="container pb-2">
    <div class="row py-3">
      <div class="col-10">
        <h1>{{ title }}</h1>
      </div>
      <div class="col-2 text-end">
        <button class="btn btn-outline-success" @click="$emit('new')">
          <b-icon icon="plus-circle" size="lg"></b-icon>
        </button>
      </div>
    </div>
    <slot name="inline-form"></slot>
    <div class="row mb-1" v-for="item of items" :key="item">
      <div class="col-10">
        <slot name="item" :item="item" :display="item[display]" :columns="columns">
          <h2>{{ item[display] }}</h2>
          <template v-for="column of columns">
            <p>{{ item[column] }}</p>
          </template>
        </slot>
      </div>
      <div class="col-2 text-end">
        <button :class="['btn', buttonClass]" @click="$emit('action', item)">
          <b-icon :icon="buttonIcon" size="lg"></b-icon>
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  export default defineComponent({
    name: 'KTable',
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
      },
      buttonClass: {
        type: String,
        default: 'btn-outline-secondary'
      },
      buttonIcon: {
        type: String,
        default: 'pencil'
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
