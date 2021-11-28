<template>
  <div class="project-details">
    <input v-if="isNew" type="text" v-model="item.name" ref="name" placeholder="Project name"/>
    <span v-else>{{ item.name }}</span>
    <textarea rows="5" v-model="item.description" ref="description" placeholder="Project description"/>
    <input type="color" v-model="item.color"/>
    <!-- <button @click="add">
      <font-awesome-icon icon="plus" fixed-width size="lg"></font-awesome-icon>
    </button> -->
    <button @click="remove">Remove</button>
    <button @click="cancel">Cancel</button>
    <button @click="save">Save</button>
  </div>
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
        required: false
      }
    },
    created() {
      Object.assign(this.item, this.project);
    },
    mounted() {
      // this.focusOnName();
    },
    data() {
      return {
        item: {} as IProject
      };
    },
    computed: {
      isNew(): boolean {
        return this.project === undefined;
      }
    },
    methods: {
      save() {
        if (this.isValid()) {
          this.$emit('save', this.item);
        }
      },
      isValid() {
        return this.item.description.length > 0
          && this.item.name.length > 0
          && this.item.color.length > 0;
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
