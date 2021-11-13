<template>
  <div>
    <span class="logo">K</span>
  </div>
  <nav>
      <!-- links.learning.rel -->
    <category-button routerLink="/learning" icon="graduation-cap">
        ensimmäinen
        <!-- {{ links.learning.title }} -->
    </category-button>

<!-- links.hours.rel -->
    <category-button routerLink="/hours" icon="calendar-alt">
        toinen
        <!-- {{ links.hours.title }} -->
    </category-button>
<!-- links.todos.rel -->
    <category-button routerLink="/todos" icon="clipboard-list">
        kolmas
        <!-- {{ links.todos.title }} -->
    </category-button>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import CategoryButton from './CategoryButton.vue'
export default defineComponent({
  components: {
    CategoryButton
  }
})
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
