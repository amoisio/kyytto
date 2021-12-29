<template>
  <router-link :class="{ 'menu-button': true, 'active': isCurrentRoute }" :to="routerLink">
    <b-icon
      :icon="icon"
      size="2x" >
    </b-icon><br/>
    <span class="slot">
      <slot></slot>
    </span>
  </router-link>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'MenuButton',
    props: {
      icon: String,
      routerLink: String
    },
    computed: {
      isCurrentRoute(): boolean {
        return this.routerLink === this.$route.name;
      }
    }
  });
</script>
