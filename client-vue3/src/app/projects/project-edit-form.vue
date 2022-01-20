<template>
  <form @submit.prevent="save" autocomplete="off">
    <div class="mb-3">
      <label for="projectName" class="form-label">Name</label>
      <input
        type="text"
        class="form-control"
        id="projectName"
        v-model="item.name"
        ref="name"
        placeholder="Project name"
      />
    </div>
    <div class="mb-3">
      <label for="projectDescription" class="form-label">Description</label>
      <textarea
        id="projectDescription"
        class="form-control"
        rows="5"
        v-model="item.description"
        ref="description"
        placeholder="Project description"
      />
    </div>
    <div class="row justify-content-between">
      <div class="col-auto">
        <button type="submit" class="btn btn-outline-success me-2">Save</button>
        <button type="button" @click="cancel" class="btn btn-outline-secondary">Cancel</button>
      </div>
      <div class="col-auto text-end">
        <button type="button" @click="remove" class="btn btn-outline-danger">Remove</button>
      </div>
    </div>
  </form>
</template>
<script lang="ts">
  import { ColorType, IdentifierType } from 'kyytto-models';
  import { defineComponent, PropType } from 'vue';
  import { Project } from './project-models';

  export default defineComponent({
    name: 'ProjectEditForm',
    emits: ['save', 'remove', 'cancel'],
    props: {
      project: {
        type: Object as PropType<Project>,
        required: true
      }
    },
    data() {
      return {
        item: new ProjectEditFormModel(this.project)
      };
    },
    mounted() {
      this.focusOnName();
    },
    methods: {
      save() {
        this.$emit('save', this.item.toProject());
      },
      remove() {
        this.$emit('remove', this.item.id);
      },
      cancel() {
        this.$emit('cancel');
      },
      focusOnName() {
        const input = this.$refs.name as HTMLElement;
        input.focus();
      }
    }
  });

  class ProjectEditFormModel {
    public readonly id: IdentifierType;
    public name: string;
    public description?: string;
    public color: ColorType;

    constructor(project: Project) {
      this.id = project.id;
      this.name = project.name;
      this.description = project.description;
      this.color = project.color;
    }

    public toProject(): Project {
      return new Project(
        this.id,
        this.name,
        this.description ?? '',
        this.color);
    }
  }
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
