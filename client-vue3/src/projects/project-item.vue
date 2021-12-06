<template>
  <div class="row mt-2 mb-2">
    <div class="col-1">
      <button class="btn btn-primary position-relative" @click="$emit('edit')">
        Edit
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill" :style="{ 'background-color': project.color }"> 
          <font-awesome-icon icon="pen" fixed-width size="md">d</font-awesome-icon>
        </span>
      </button>
    </div>
    <div class="col">
      <span class="project-name">{{ project.name }}</span>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { IProject } from './project';

  export default defineComponent({
    name: 'ProjectItem',
    emits: ['edit'],
    props: {
      project: {
        type: Object as PropType<IProject>,
        required: true
      }
    }
  });
</script>
<style lang="scss">
  @use '../defaults';
  @use 'sass:color';
  .project-item {
    background-color: transparent;
    color: defaults.$dark1;
    margin-top: defaults.$margin;
    text-align: left;
    border-top: 0px solid defaults.$light2;
    border-bottom: 0px solid defaults.$light2;
    padding: 4px;
    margin: 14px;

    .project-color {
      display: inline-flex;
      margin-top: 2px;
      margin-right: 4px;
      width: 15px;
      height: 15px;
      border: 2px defaults.$border-style defaults.$border-color;
    }

    .project-name {
      margin-top: 2px;
      position: relative;
      display: inline-flex;
      font-size: larger;
    }

    .edit-item {
      float:right;      
      padding: 4px;
      margin-top: -1px;
      color: defaults.$dark2;
      &:focus {
        outline: none;
      }

      &:hover,
      &:focus,
      &.active {
        background-color: color.adjust(defaults.$dark2, $blackness: 20%);
        color: defaults.$highlight1;
      }
    }
  }
</style>
