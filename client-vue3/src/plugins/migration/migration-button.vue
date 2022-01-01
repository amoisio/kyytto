<template>
  <a :class="{ 'menu-button': true }" @click="migrate">
    <b-icon icon="cloud-upload" size="2x"></b-icon>
    <br/>
    <span class="slot">
      Migrate
    </span>
  </a>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { MigrationService } from './migration-service';
  export default defineComponent({
    name: 'MigrationButton',
    methods: {
      async migrate(): Promise<void> {
        const svc = new MigrationService();
        await svc.migrate();
      }
    }
  });
</script>
