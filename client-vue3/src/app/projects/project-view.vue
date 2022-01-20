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
        <project-edit-form v-model="project"></project-edit-form>
      </div>
    </div>
    <div class="row">
      <div class="col-6 col-md-3">
        <button type="button" @click="save" class="btn btn-outline-success me-2">Save</button>
        <button type="button" @click="cancel" class="btn btn-outline-secondary">Cancel</button>
      </div>
      <div class="col-6 col-md-3 text-end">
        <button type="button" @click="remove" class="btn btn-outline-danger">Remove</button>
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
