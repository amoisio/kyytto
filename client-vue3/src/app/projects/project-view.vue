<template>
  <div class="project-view" v-if="isReady">
    <div class="row pb-3 pt-3">
      <div class="col-6 col-md-3">
        <h1>Project</h1>
      </div>
      <div class="col-6 col-md-3 align-self-center text-end">
        <div class="position-relative mb-4 me-4">
          <bordered-icon icon="tag" scale="2" :color="project.color" border-color="black"></bordered-icon>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <project-edit-form :project="project" @save="save" @remove="remove" @cancel="cancel"></project-edit-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import ProjectEditForm from './project-edit-form.vue';
  import BorderedIcon from '@/shared/bordered-icon.vue';
  import { Project } from './project-models';
  import { Identifier, IdentifierType } from 'kyytto-models';
  import { NotificationService } from '@/shared/notification-service';

  export default defineComponent({
    name: 'ProjectView',
    components: {
      ProjectEditForm,
      BorderedIcon
    },
    props: {
      id: {
        type: Object as PropType<IdentifierType>,
        required: true,
        validator: (uuid: IdentifierType) => Identifier.isValidOrNil(uuid)
      }
    },
    data() {
      return {
        isReady: false,
        project: {} as Project
      };
    },
    computed: {
      notificationService(): NotificationService {
        return this.$services.notificationService;
      }
    },
    async created() {
      try {
        this.isReady = false;
        if (Identifier.isNil(this.id)) {
          this.project = new Project();
        } else {
          this.project = await this.$services.projectService.getById(this.id);
        }
      } catch (e) {
        this.notificationService.notifyError(`Loading a project with id ${this.id} failed.`, 'Error', e);
        await this.navigateToProjects();
      } finally {
        this.isReady = true;
      }
    },
    methods: {
      async save(project: Project): Promise<void> {
        const errors = project.validate();
        if (errors.length > 0) {
          this.notificationService.notifyWarning(errors.join('\n'), 'Validation error');
          return;
        }

        try {
          await this.$services.projectService.save(project);
          this.notificationService.notifySuccess('Project saved.');
          await this.navigateToProjects();
        } catch (e) {
          this.notificationService.notifyError('Save failed.', 'Error', e);
        }
      },
      async remove(id: IdentifierType): Promise<void> {
        if (!Identifier.isValid(id)) {
          this.notificationService.notifyWarning(`Unable to remove project. Id ${id} is invalid.`);
          await this.cancel();
          return;
        }

        try {
          await this.$services.projectService.delete(id);
          this.notificationService.notifySuccess('Project removed.');
          await this.navigateToProjects();
        } catch (e) {
          this.notificationService.notifyError('Remove failed.', 'Error', e);
        }
      },
      async cancel(): Promise<void> {
        await this.navigateToProjects();
      },
      async navigateToProjects(): Promise<void> {
        await this.$router.push({ name: 'projects' });
      }
    }
  });
</script>
