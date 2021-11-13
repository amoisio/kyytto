<template>
  <router-link class="category-button" :to="routerLink">
    <span :class="className"></span>
    <span>
      <slot></slot>
    </span>
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    className: String,
    routerLink: String
  }
})
</script>
<style scoped>
  .category-button {
    display: block;
    color: white;
    padding: 10px 0px 10px 0px;
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
  }
</style>
