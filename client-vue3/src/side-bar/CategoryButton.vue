<template>
  <router-link class="category-button" :to="routerLink">
    <font-awesome-icon :icon="icon" fixed-width size="lg"></font-awesome-icon>
    <span>
      <slot></slot>
    </span>
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    icon: String,
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
