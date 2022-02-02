<template>
  <div class="project-view container pb-2 my-5" v-if="isReady">
    <div class="row py-3">
      <div class="col-12">
        <k-page-header>Project</k-page-header>
      </div>
    </div>
    <div class="row py-3">
      <div class="col-12">
        <project-edit-form v-model="project"></project-edit-form>
      </div>
    </div>
    <div class="row py-3">
      <div class="col-6">
        <k-button-danger class="me-1" icon="x" @activate="remove"></k-button-danger>
        <k-button icon="arrow-left-short" @activate="cancel"></k-button>
      </div>
      <div class="col-6 text-end">
        <k-button-success icon="arrow-down-short" @activate="save"></k-button-success>
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
  import KPageHeader from '@/shared/k-page-header.vue';
  import KButtonDanger from '@/shared/k-button-danger.vue';
  import KButton from '@/shared/k-button.vue';
  import KButtonSuccess from '@/shared/k-button-success.vue';

  export default defineComponent({
    name: 'ProjectView',
    components: {
      ProjectEditForm,
      BorderedIcon,
      KPageHeader,
      KButtonDanger,
      KButton,
      KButtonSuccess
    },
    props: {
      id: {
        type: String as PropType<IdentifierType>,
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
        this.project = Identifier.isNil(this.id)
          ? new Project()
          : await this.$services.projectService.getById(this.id);
      } catch (e) {
        this.notificationService.notifyError(`Loading a project with id ${this.id} failed.`, 'Error', e);
        await this.navigateToProjects();
      } finally {
        this.isReady = true;
      }
    },
    methods: {
      async save(): Promise<void> {
        const project = this.project;
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
      async remove(): Promise<void> {
        const id = this.id;
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
<style lang="scss">
  .hidden {
    position: absolute;
    width: 0px;
    height: 0px;
    overflow: hidden;
    z-index: -10;
  }
</style>
