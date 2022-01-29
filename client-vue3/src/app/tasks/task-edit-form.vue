<template>
  <form autocomplete="off">
    <text-input class="mb-3" id="task-title" v-model="task.title" placeholder="Task title">Title</text-input>
    <textarea-input
      class="mb-3"
      id="task-description"
      v-model="task.description"
      placeholder="Task description"
      :rows="10"
      >Description</textarea-input
    >
    <div class="mb-3">
      <input type="checkbox" name="task-bug" id="task-bug" v-model="task.isBug" />
      <label for="task-bug" class="form-label px-2">Is Bug?</label>
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
        <button
          type="button"
          @click="task.stopWork()"
          :class="[{ active: task.isTodo() }, 'btn btn-outline-primary me-2']"
        >
          To do
        </button>
        <button
          type="button"
          @click="task.startWork()"
          :class="[{ active: task.isStarted() }, 'btn btn-outline-primary me-2']"
        >
          In-progress
        </button>
        <button
          type="button"
          @click="task.complete()"
          :class="[{ active: task.isCompleted() }, 'btn btn-outline-success']"
        >
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
  import TextInput from '@/shared/text-input.vue';
  import TextareaInput from '@/shared/textarea-input.vue';

  export default defineComponent({
    name: 'TaskEditForm',
    components: {
      TagSelector,
      ProjectSelector,
      TextInput,
      TextareaInput
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
