<template>
  <nav class="menu">
    <div class="row pb-3 pt-3">
      <div class="col">
        <router-link to="/" class="logo">
          K
        </router-link>
      </div>
    </div>
    <div class="row" v-for="link of links" :key="link.href">
      <div class="col">
        <menu-button class="mx-0 pt-3 pb-3" :routerLink="linkFrom(link.href)" :icon="link.icon">
          {{ link.title }}
        </menu-button>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import MenuButton from './menu-button.vue';
  import { parse } from '@/lib/hrefParser';
  import { IMenuService, MenuService } from './menu-service';
  import { Link } from 'kyytto-models';
  
  export default defineComponent({
    name: 'MenuView',
    components: {
      MenuButton
    },
    created() {
      this.links = this.service.getAll();
    },
    data() {
      return {
        links: [] as Link[]
      };
    },
    computed: {
      service(): IMenuService {
        return new MenuService();
      },
      eventName(): string {
        return 'keypress.q';
      }
    },
    methods: {
      linkFrom(href: string): string {
        return parse(href).rel;
      }
    }
  });
</script>
<style lang="scss">
  @use 'menu';
</style>
