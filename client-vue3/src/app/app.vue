<template>
  <div class="container-fluid" >
    <div class="row">
      <div class="col menu-container gx-0">
        <menu-view class="min-vh-100"></menu-view>
      </div>
      <div class="col">
        <router-view v-if="authOk"></router-view>
      </div>
    </div>
    <notifications position="bottom right" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import MenuView from './menu/menu-view.vue';

  export default defineComponent({
    components: {
      MenuView
    },
    async created() {
      try {
        await this.$authentication.login('user', 'password');
        this.authOk = true;
      } catch {
        this.$services.notificationService.notifyError('Authentication failed.');
      }
    },
    data() {
      return {
        authOk: false
      }
    }
  });
</script>
<style lang="scss">
  @use 'app';
</style>
