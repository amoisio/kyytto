<template>
  <nav class="menu">
    <div class="logo">K</div>
    <category-button v-for="link of links" :key="link.href" :routerLink="linkFrom(link.href)" :icon="link.icon">
      {{ link.title }}
    </category-button>
  </nav>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import CategoryButton from './category-button.vue';
  import { parse } from '@/lib/hrefParser';
  import ILink from '@/ilink';
  import { IMenuService, MenuService } from './menu-service';
  export default defineComponent({
    name: 'SideBar',
    components: {
      CategoryButton
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
        console.log('linkFrom');
        return parse(href).rel;
      }
    }
  });
</script>
<style lang="scss">
  @import '@/assets/globals.scss';

  .menu {
    color: $platinum;
    .logo {
      display: block;
      text-align: center;
      font-size: xx-large;
      padding-top: 20px;
      padding-bottom: 20px;
      color: $platinum;
    }
  }
</style>
