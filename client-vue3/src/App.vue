<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>Welcome to Your Vue.js + TypeScript App</h1>
  <side-bar></side-bar>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SideBar from './side-bar/SideBar.vue'
export default defineComponent({
  components: {
    SideBar
  }
})
</script>
