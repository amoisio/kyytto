<template>
  <form autocomplete="off">
    <div class="mb-3">
      <label for="task-title" class="form-label">Title</label>
      <input
        type="text"
        class="form-control"
        id="task-title"
        v-model="item.title"
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
        v-model="item.description"
        ref="description"
        placeholder="Task description"
      />
    </div>
    <div class="mb-3">
      <label for="task-project" class="form-label">Project</label>
      <select class="form-select" v-model="selectedProjectId" required>
        <option value="" disabled selected>Choose related project...</option>
        <option v-for="project in projects" :key="project.id.value" :value="project.id.value">
          {{ project.name }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label for="task-tags" class="form-label">Tags</label>
      <tag-selector id="task-tags" v-model="selectedTags" :options="tags"></tag-selector>
    </div>
    <div class="row mb-3 justify-content-between" v-if="!item.isNew">
      <div class="col-auto">
        <label class="form-label">State</label>
      </div>
      <div class="col-auto text-end">
        <button type="button" @click="setTodo" :class="[{ active: isTodo }, 'btn btn-outline-primary me-2']">
          To do
        </button>
        <button
          type="button"
          @click="setInProgress"
          :class="[{ active: isInProgress }, 'btn btn-outline-primary me-2']"
        >
          In-progress
        </button>
        <button type="button" @click="setCompleted" :class="[{ active: isCompleted }, 'btn btn-outline-success']">
          Completed
        </button>
      </div>
    </div>
  </form>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Project } from '@/app/projects/project-models';
  import { TaskState } from './task-state';
  import { Task } from './task-models';
  import { Identifier, IdentifierType, Utilities } from 'kyytto-models';
  import TagSelector from '../tags/tag-selector.vue';
  import { Tag } from '../tags/tag-models';

  export default defineComponent({
    name: 'TaskEditForm',
    components: {
      TagSelector
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
        item: new TaskEditModel(this.modelValue)
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
      },
      selectedProjectId: {
        get(): string {
          return this.item.project?.id ?? '';
        },
        set(id: string) {
          const match = this.projects.find((p) => p.id === id);
          if (match !== undefined) {
            this.item.project = match;
          }
        }
      },
      selectedTags: {
        get(): Tag[] {
          return this.item.tags;
        },
        set(newTags: Tag[]): void {
          this.item.tags = newTags;
        }
      }
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
      focusOnTitle() {
        const input = this.$refs.title as HTMLElement;
        input.focus();
      }
    },
    watch: {
      item: {
        handler(newValue: TaskEditModel) {
          this.$emit('update:modelValue', newValue.toTask());
        },
        deep: true
      }
    }
  });

  class TaskEditModel {
    public readonly id: IdentifierType;
    public title: string;
    public description?: string;
    public state: TaskState;
    public project?: Project;
    public tags: Tag[];

    constructor(task: Task) {
      this.id = task.id;
      this.title = task.title;
      this.description = task.description;
      this.state = task.state;
      this.project = Identifier.isNil(task.project.id) ? undefined : task.project;
      this.tags = task.tags;
    }

    public get color(): string | undefined {
      return this.project?.color;
    }

    public get isNew(): boolean {
      return Identifier.isNil(this.id);
    }

    public validate(): boolean {
      return !Utilities.isEmpty(this.title) && !!this.project && Identifier.isValid(this.id);
    }
    public toTask(): Task {
      if (this.project === undefined) {
        throw new Error('Project must be selected.');
      }
      return new Task(this.id, this.project, this.tags, this.title, this.description ?? '', this.state);
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
