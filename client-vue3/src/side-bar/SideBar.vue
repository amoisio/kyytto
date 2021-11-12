<template>
  {{ message }}
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data () {
    return {
      message: 'Sidebar message'
    }
  }
})
</script>
<style lang="scss">
</style>
