<template>
  <form autocomplete="off">
    <div class="mb-3">
      <label for="task-title" class="form-label">Title</label>
      <input
        type="text"
        class="form-control"
        id="task-title"
        v-model="task.title"
        ref="title"
        placeholder="Task title"
        required
      />
    </div>
    <div class="mb-3">
      <label for="task-description" class="form-label">Description</label>
      <textarea
        id="task-description"
        class="form-control"
        rows="15"
        v-model="task.description"
        ref="description"
        placeholder="Task description"
      />
    </div>
    <div class="mb-3">
      <label for="task-project" class="form-label">Project</label>
      <project-selector v-model="task.project" :options="projects"></project-selector>
    </div>
    <div class="mb-3">
      <label for="task-tags" class="form-label">Tags</label>
      <tag-selector id="task-tags" v-model="task.tags" :options="tags"></tag-selector>
    </div>
    <div class="row mb-3 justify-content-between" v-if="!task.isNew()">
      <div class="col-auto">
        <label class="form-label">State</label>
      </div>
      <div class="col-auto text-end">
        <button type="button" @click="task.stopWork()" :class="[{ active: task.isTodo() }, 'btn btn-outline-primary me-2']">
          To do
        </button>
        <button 
          type="button"
          @click="task.startWork()"
          :class="[{ active: task.isStarted() }, 'btn btn-outline-primary me-2']"
        >
          In-progress
        </button>
        <button type="button" @click="task.complete()" :class="[{ active: task.isCompleted() }, 'btn btn-outline-success']">
          Completed
        </button>
      </div>
    </div>
  </form>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Project } from '@/app/projects/project-models';
  import { Task } from './task-models';
  import TagSelector from '../tags/tag-selector.vue';
  import { Tag } from '../tags/tag-models';
  import ProjectSelector from '../projects/project-selector.vue';

  export default defineComponent({
    name: 'TaskEditForm',
    components: {
      TagSelector,
      ProjectSelector
    },
    emits: ['update:modelValue'],
    props: {
      modelValue: {
        type: Object as PropType<Task>,
        required: true
      },
      projects: {
        type: Array as PropType<Project[]>,
        required: true
      },
      tags: {
        type: Array as PropType<Tag[]>,
        required: true
      }
    },
    data() {
      return {
        task: this.modelValue.copy()
      };
    },
    mounted() {
      this.focusOnTitle();
    },
    methods: {
      focusOnTitle() {
        const input = this.$refs.title as HTMLElement;
        input.focus();
      }
    },
    watch: {
      task: {
        handler(newValue: Task) {
          this.$emit('update:modelValue', newValue);
        },
        deep: true
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
  select:required:invalid {
    color: gray;
  }
  option[value=''][disabled] {
    display: none;
  }
  option {
    color: black;
  }
</style>
