<template>
  <div>
    <span class="logo">K</span>
  </div>
  <nav>
      <!-- links.learning.rel -->
    <category-button routerLink="/learning" className="fas fa-graduation-cap fa-fw fa-2x">
        ensimmäinen
        <!-- {{ links.learning.title }} -->
    </category-button>

<!-- links.hours.rel -->
    <category-button routerLink="/hours" className="fas fa-calendar-alt fa-fw fa-2x">
        toinen
        <!-- {{ links.hours.title }} -->
    </category-button>
<!-- links.todos.rel -->
    <category-button routerLink="/todos" className="fas fa-clipboard-list fa-fw fa-2x">
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
