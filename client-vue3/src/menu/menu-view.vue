<template>
  <nav class="menu">
    <div class="logo">K</div>
    <menu-button v-for="link of links" :key="link.href" :routerLink="linkFrom(link.href)" :icon="link.icon">
      {{ link.title }}
    </menu-button>
  </nav>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import MenuButton from './menu-button.vue';
  import { parse } from '@/lib/hrefParser';
  import { ILink } from '@/ilink';
  import { IMenuService, MenuService } from './menu-service';
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
        links: [] as ILink[]
      };
    },
    computed: {
      service(): IMenuService {
        return new MenuService();
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
