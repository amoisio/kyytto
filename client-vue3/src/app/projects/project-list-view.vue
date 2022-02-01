<template>
  <k-table-view 
    class="projects mt-5"
    title="Projects"
    :items="projects" 
    display="name" 
    :columns="['description']" 
    @new="navigateToEditForm"
    @action="navigateToEditForm">
  </k-table-view>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Project } from './project-models';
  import { NotificationService } from '@/shared/notification-service';
  import { Identifier } from 'kyytto-models';
  import KTableView from '@/shared/k-table-view.vue';

  export default defineComponent({
    name: 'ProjectListView',
    components: {
      KTableView
    },
    async created() {
      try {
        this.projects = await this.$services.projectService.getAll();
      } catch (e) {
        this.notificationService.notifyError(`Loading projects failed.`, 'Error', e);
      }
    },
    data() {
      return {
        projects: [] as Project[]
      };
    },
    computed: {
      notificationService(): NotificationService {
        return this.$services.notificationService;
      }
    },
    methods: {
      async navigateToEditForm(project?: Project): Promise<void> {
        const id = project?.id ?? Identifier.nil;
        await this.$router.push({ name: 'project-form', params: { id: id } });
      }
    }
  });
</script>
<style lang="scss">
  
</style>
