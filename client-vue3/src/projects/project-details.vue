<template>
  <form>
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
    <div class="row">
      <div class="col">
        <button @click="save" class="btn btn-outline-success me-2">Save</button>
        <button @click="cancel" class="btn btn-outline-secondary">Cancel</button>
      </div>
      <div class="col text-end">
        <button @click="remove" class="btn btn-outline-danger">Remove</button>
      </div>
    </div>
  </form>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { IProject } from './project';
  export default defineComponent({
    name: 'ProjectDetails',
    emits: ['save', 'remove', 'cancel'],
    props: {
      project: {
        type: Object as PropType<IProject>,
        required: true
      }
    },
    created() {
      Object.assign(this.item, this.project);
    },
    mounted() {
      this.focusOnName();
    },
    data() {
      return {
        item: {} as IProject
      };
    },
    methods: {
      save() {
        if (this.isValid()) {
          this.$emit('save', this.item);
        }
      },
      isValid() {
        return this.item.description.length > 0 && this.item.name.length > 0 && this.item.color.length > 0;
      },
      remove() {
        this.$emit('remove', this.item);
      },
      cancel() {
        this.$emit('cancel');
      },
      focusOnName() {
        const input = this.$refs.name as HTMLElement;
        input.focus();
      },
      openColor() {
        const input = this.$refs.color as HTMLElement;
        console.log(input);
        input.focus();
        input.click();
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
