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
      return this.item.description.length > 0 &&
          this.item.name.length > 0 &&
          this.item.color.length > 0;
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
