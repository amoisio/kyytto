<template>
  <div class="project-view" v-if="isReady">
    <div class="row pb-3 pt-3">
      <div class="col-6 col-md-3">
        <h1>Project</h1>
      </div>
      <div class="col-6 col-md-3 align-self-center text-end">
        <div class="position-relative mb-4 me-4">
          <bordered-icon 
            icon="tag" 
            scale="2" 
            :color="project.color.value" 
            border-color="black"></bordered-icon>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <project-edit-form 
          :project="project" 
          @save="save"
          @remove="remove" 
          @cancel="cancel"></project-edit-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import ProjectEditForm from './project-edit-form.vue';
  import BorderedIcon from '@/shared/bordered-icon.vue';
  import { Project } from './project-models';
  import { Identifier } from 'kyytto-models';

  export default defineComponent({
    name: 'ProjectView',
    components: {
      ProjectEditForm,
      BorderedIcon
    },
    props: {
      id: {
        type: Object as PropType<Identifier>,
        required: true,
        validator: (uuid: Identifier) => uuid.validate()
      }
    },
    data() {
      return {
        isReady: false,
        project: {} as Project
      }
    },
    async created() {
      try {
        this.isReady = false;
        if (this.id.isNil()) {
          this.project = Project.empty();
        } else {
          this.project = await this.$services.projectService.getById(this.id);
        }
      } catch (e) {
        console.error(e);
        await this.navigateToProjects();
      } finally {
        this.isReady = true;
      }
    },
    methods: {
      async save(project: Project): Promise<void> {
        const errors = project.validate();
        if (errors.length > 0) {
          throw new Error(errors.join('/n'));
        }

        await this.$services.projectService.save(project);
        await this.navigateToProjects();
      },
      async remove(id: Identifier) : Promise<void> {
        if (id.isNil() || !id.validate()) {
          await this.cancel();
        } else {
          await this.$services.projectService.delete(id);
          await this.navigateToProjects();
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
