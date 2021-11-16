<template>
  <router-link class="category-button" :to="routerLink">
    <span class="icon">
      <font-awesome-icon :icon="icon" fixed-width size="lg"></font-awesome-icon>
    </span>
    <span>
      <slot></slot>
    </span>
  </router-link>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    icon: String,
    routerLink: String
  }
});
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

  .icon {
    display: block !important;;
  }
</style>
