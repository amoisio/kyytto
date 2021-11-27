<template>
  <div class="new-project-form">
    <input type="text" v-model="name" ref="name" placeholder="Project name"/>
    <div>
      <textarea rows="5" v-model="description" ref="description" placeholder="Project description  "/>
    </div>
    <div>
    <button @click="add">
      <font-awesome-icon icon="plus" fixed-width size="lg"></font-awesome-icon>
    </button>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { INewProject } from './project';
  export default defineComponent({
    name: 'ProjectAddForm',
    emits: ['add'],
    data() {
      return {
        name: undefined as string | undefined,
        description: undefined as string | undefined
      };
    },
    methods: {
      add() {
        if (this.isValid()) {
          const item = {
            name: this.name,
            description: this.description
          } as INewProject;
          this.$emit('add', item);
          this.clearForm();
          this.focusOnName();
        }
      },
      isValid() {
        return this.description !== undefined && this.name !== undefined;
      },
      clearForm() {
        this.name = undefined;
        this.description = undefined;
      },
      focusOnName() {
        const input = this.$refs.name as HTMLElement;
        input.focus();
      }
    }
  });
</script>
<style lang="scss">
  @import '@/assets/baseStyles.scss';

  input, textarea {
    border: 2px solid $russian-violet;
    border-radius: 10px;
    margin-top: 2px;
    margin-bottom: 2px;
    width: 100%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: medium;
    color: $russian-violet;
    outline-style: none;
    resize: none;

    &:focus {
      border: 2px solid $chinese-violet;
    }
  }

  button {
    // border: 2px solid $russian-violet;
    // border-radius: 10px;
    // width: 20%;
    // font-size: 1em;
    // font-weight: 400;
    // color: white;
    // background-color: $russian-violet;
    // margin-top:2px;
    // margin-bottom:2px;

    &:hover {
      background-color: $chinese-violet;
    }

    &:focus {
      background-color: $chinese-violet;
    }
  }
</style>
