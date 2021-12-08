<template>
  <span :class="['position-absolute', $attrs.class]">
    <b-icon :icon="fillIcon" :scale="scale" :style="{ 'color': color, 'overflow': 'visible', 'z-index': '0' }">
    </b-icon>
  </span>
  <span :class="['position-absolute', $attrs.class]">
    <b-icon :icon="icon" :scale="scale" :style="{ 'color': borderColor, 'overflow': 'visible', 'z-index': '1' }"></b-icon>
  </span>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  export default defineComponent({
    name: 'BorderedIcon',
    props: {
      icon: {
        type: String,
        required: true
      },
      scale: {
        type: String,
        default: "1"
      },
      color: String,
      borderColor: String
    },
    computed: {
      fillIcon(): string {
        return `${this.icon}-fill`;
      }
    }
  });
</script>
<style lang="scss"></style>
