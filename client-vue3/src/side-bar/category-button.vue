<template>
  <router-link :class="{ 'category-button': true, 'active': isCurrentRoute }" :to="routerLink">
    <span class="icon">
      <font-awesome-icon :icon="icon" fixed-width size="lg"></font-awesome-icon>
    </span>
    <span class="slot">
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
    },
    computed: {
      isCurrentRoute(): boolean {
        return this.routerLink === this.$route.path;
      }
    }
  });
</script>
<style lang="scss">
  @import '@/assets/globals.scss';

  .category-button {
    display: block;
    color: $platinum;
    padding: 8px 0px;
    text-align: center;
    text-decoration: none;

    .icon {
      display: block !important;
      margin-bottom: 8px;
    }

    &:focus {
      outline: none;
    }

    &:hover,
    &:focus,
    &.active {
      background-color: $lavender-gray;
      color: $russian-violet;
    }
  }
</style>
