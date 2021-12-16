<template>
  <form @submit.prevent="save" autocomplete="off">
    <div class="mb-3">
      <label for="task-title" class="form-label">Title</label>
      <input
        type="text"
        class="form-control"
        id="task-title"
        v-model="item.title"
        ref="title"
        placeholder="Task title" />
    </div>
    <div class="mb-3">
      <label for="task-description" class="form-label">Description</label>
      <textarea
        id="task-description"
        class="form-control"
        rows="5"
        v-model="item.description"
        ref="description"
        placeholder="Task description" />
    </div>
    <div class="mb-3">
      <label for="task-project" class="form-label">Project</label>
      <select class="form-select" v-model="item.project">
        <option disabled value="">Please select one</option>
        <option v-for="project in projects" :key="project.id" :value="project">{{ project.name }}</option>
      </select>
    </div>
    <div class="row mb-3 justify-content-between">
      <div class="col-auto">
        <label class="form-label">State</label>
      </div>
      <div class="col-auto text-end">
        <button type="button" @click="setTodo" :class="[{ 'active': isTodo }, 'btn btn-outline-primary me-2']">To do</button>
        <button type="button" @click="setInProgress" :class="[{ 'active': isInProgress }, 'btn btn-outline-primary me-2']">In-progress</button>
        <button type="button" @click="setCompleted" :class="[{ 'active': isCompleted }, 'btn btn-outline-success']">Completed</button>
      </div>
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
  import { IProject } from '@/projects/project-models';
  import { TaskEditFormModel } from './task-models';
  import { TaskState } from './task-state';
  export default defineComponent({
    name: 'TaskEditForm',
    emits: ['update:modelValue', 'remove', 'cancel'],
    props: {
      modelValue: {
        type: Object as PropType<TaskEditFormModel>,
        required: true
      },
      projects: {
        type: Array as PropType<IProject[]>,
        required: true
      }
    },
    data() {
      return {
        item: new TaskEditFormModel()
      };
    },
    computed: {
      isTodo(): boolean {
        return this.item.state === TaskState.Todo;
      },
      isInProgress(): boolean {
        return this.item.state === TaskState.InProgress;
      },
      isCompleted(): boolean {
        return this.item.state === TaskState.Completed;
      }
    },
    created() {
      Object.assign(this.item, this.modelValue);
    },
    mounted() {
      this.focusOnTitle();
    },
    methods: {
      setTodo() {
        this.item.state = TaskState.Todo;
      },
      setInProgress() {
        this.item.state = TaskState.InProgress;
      },
      setCompleted() {
        this.item.state = TaskState.Completed;
      },
      save() {
        this.$emit('update:modelValue', this.item);
      },
      remove() {
        this.$emit('remove');
      },
      cancel() {
        this.$emit('cancel');
      },
      focusOnTitle() {
        const input = this.$refs.title as HTMLElement;
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
