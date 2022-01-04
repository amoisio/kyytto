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
        placeholder="Task title"
        required
      />
    </div>
    <div class="mb-3">
      <label for="task-description" class="form-label">Description</label>
      <textarea
        id="task-description"
        class="form-control"
        rows="5"
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
  import { Project } from '@/app/projects/project-models';
  import { TaskState } from './task-state';
  import { Task } from './task-models';
  import { idBuilder, Identifier } from 'kyytto-models';

  export default defineComponent({
    name: 'TaskEditForm',
    emits: ['save', 'remove', 'cancel'],
    props: {
      task: {
        type: Object as PropType<Task>,
        required: true
      },
      projects: {
        type: Array as PropType<Project[]>,
        required: true
      }
    },
    data() {
      return {
        item: new TaskEditModel(this.task)
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
          return this.item.project?.id.value ?? '';
        },
        set(id: string) {
          const match = this.projects.find((p) => p.id.value === id);
          if (match !== undefined) {
            this.item.project = match;
          }
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
      save() {
        this.$emit('save', this.item.toTask());
      },
      remove() {
        this.$emit('remove', this.item.id);
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

  class TaskEditModel {
    public readonly id: Identifier;
    public title: string;
    public description?: string;
    public state: TaskState;
    public project?: Project;
    
    constructor(task: Task) {
      this.id = idBuilder(task.id.value);
      this.title = task.title;
      this.description = task.description;
      this.state = task.state;
      this.project = task.project.id.isNil() 
        ? undefined
        : task.project;
    }

    public get color(): string | undefined {
      return this.project?.color.value;
    }

    public get isNew(): boolean {
      return this.id.isNil();
    }

    public toTask(): Task {
      if (this.project === undefined) {
        throw new Error("Project must be selected.");
      }
      return new Task(
        idBuilder(this.id.value),
        this.title,
        this.description,
        this.state,
        this.project);
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
