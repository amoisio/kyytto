<template>
  <a class="category-button" @click="routeTo(routerLink)">
    <span :class="className"></span>
    <span>
      <slot></slot>
    </span>
  </a>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    className: String,
    routerLink: String
  },
  methods: {
    routeTo (route: string) {
      alert(route)
    }
  }
})
</script>
<style lang="css">
  .category-button {
    display: block;
    color: white;
    padding: 10px 0px 10px 0px;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
  }
</style>
