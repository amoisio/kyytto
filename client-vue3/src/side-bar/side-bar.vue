<template>
  <div>
    <span class="logo">K</span>
  </div>
  <nav>
    <category-button
      :routerLink="navigation.learning.rel"
      icon="graduation-cap"
    >
      {{ navigation.learning.title }}
    </category-button>
    <category-button :routerLink="navigation.hours.rel" icon="calendar-alt">
      {{ navigation.hours.title }}
    </category-button>
    <category-button :routerLink="navigation.todos.rel" icon="clipboard-list">
      {{ navigation.todos.title }}
    </category-button>
  </nav>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import CategoryButton from './category-button.vue';
  import { HomeDto } from './home';
  export default defineComponent({
    name: 'SideBar',
    components: {
      CategoryButton
    },
    created() {
      this.navigation = {
        href: '/',
        rel: '/',
        learning: {
          href: '/learning',
          rel: '/learning',
          title: 'Learning'
        },
        hours: {
          href: '/hours',
          rel: '/hours',
          title: 'Hours'
        },
        todos: {
          href: '/todos',
          rel: '/todos',
          title: 'Todos'
        }
      } as HomeDto;
    },
    data() {
      return {
        navigation: {} as HomeDto
      };
    }
  });
</script>
<style lang="css">
  .logo {
    display: block;
    text-align: center;
    font-size: xx-large;
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>
