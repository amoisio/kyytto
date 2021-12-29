<template>
  <nav class="menu">
    <div class="row pb-3 pt-3">
      <div class="col">
        <router-link to="/" class="logo">
          K
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <menu-button class="mx-0 pt-3 pb-3" :routerLink="board.path" :icon="board.icon">
          {{ board.title }}
        </menu-button>
      </div>
    </div> 
    <div class="row" >
      <div class="col">
        <menu-button class="mx-0 pt-3 pb-3" :routerLink="projects.path" :icon="projects.icon">
          {{ projects.title }}
        </menu-button>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import MenuButton from './menu-button.vue';
  import { menuLinks, Link } from './menu-links';
  
  export default defineComponent({
    name: 'MenuView',
    components: {
      MenuButton
    },
    data() {
      return {
        board: menuLinks.board,
        projects: menuLinks.projects
      };
    },
    computed: {
      eventName(): string {
        return 'keypress.q';
      }
    }
  });
</script>
<style lang="scss">
  @use 'menu';
</style>
