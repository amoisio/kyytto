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
        placeholder="Project name" />
    </div>
    <div class="mb-3">
      <label for="projectDescription" class="form-label">Description</label>
      <textarea
        id="projectDescription"
        class="form-control"
        rows="5"
        v-model="item.description"
        ref="description"
        placeholder="Project description" />
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
  import { defineComponent, PropType } from 'vue';
  import { ProjectEditFormModel } from './project-edit-form-model';

  export default defineComponent({
    name: 'ProjectEditForm',
    emits: ['update:modelValue', 'remove', 'cancel'],
    props: {
      modelValue: {
        type: Object as PropType<ProjectEditFormModel>,
        required: true
      }
    },
    data() {
      return {
        item: new ProjectEditFormModel()
      };
    },
    created() {
      Object.assign(this.item, this.modelValue);
    },
    mounted() {
      this.focusOnName();
    },
    methods: {
      save() {
        this.$emit('update:modelValue', this.item);
      },
      remove() {
        this.$emit('remove');
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
