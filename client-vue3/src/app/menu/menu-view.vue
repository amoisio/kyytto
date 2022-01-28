<template>
  <nav class="menu">
    <div class="row pb-3 pt-3">
      <div class="col">
        <router-link to="/" class="logo">
          K
        </router-link>
      </div>
    </div>
    <div class="row" v-for="link of links" :key="link.name">
      <div class="col">
        <menu-button class="mx-0 pt-3 pb-3" :routerLink="link.path" :icon="link.icon">
          {{ link.title }}
        </menu-button>
      </div>
    </div> 
    <div class="user-nav">
        <menu-button class="mx-0 pt-3 pb-3" routerLink="/user" icon="person-circle">
          User
        </menu-button>
    </div>
  </nav>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import MenuButton from './menu-button.vue';
  import { Link, menuLinks } from './menu-links';
  
  export default defineComponent({
    name: 'MenuView',
    components: {
      MenuButton
    },
    computed: {
      eventName(): string {
        return 'keypress.q';
      },
      links(): Link[] {
        return [
          menuLinks.newTask,
          menuLinks.board,
          menuLinks.projects,
          menuLinks.tags,
          menuLinks.stacks
        ];
      }
    }
  });
</script>
<style lang="scss">
  @use 'menu';
  @use '../app';

  .user-nav {
    position: absolute; 
    bottom:0; 
    left:0;
    width:app.$width;
  }
</style>
