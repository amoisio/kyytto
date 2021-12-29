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
        <menu-button class="mx-0 pt-3 pb-3" :routerLink="link.href" :icon="link.icon">
          {{ link.title }}
        </menu-button>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import MenuButton from './menu-button.vue';
  import { Link } from 'kyytto-models';
  
  export default defineComponent({
    name: 'MenuView',
    components: {
      MenuButton
    },
    async created() {
      this.links = await this.$services.menuService.getAll();
    },
    data() {
      return {
        links: [] as Link[]
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
