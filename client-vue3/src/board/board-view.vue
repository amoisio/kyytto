<template>
  <div class="board">
    <div class="row pb-3 pt-3">
      <div class="col-auto">
        <h1>Board</h1>
      </div>
      <div class="col align-self-center">
        <button id="new-item" class="btn btn-outline-primary" @click="navigateToItemForm()">
          <b-icon icon="star" size="2x"></b-icon>
          <span class="fs-5">New Item</span>
        </button>
      </div>
    </div>
    <div class="row"></div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'BoardView',
    computed: {},
    // data() {
    //   return {
    //     projects: [] as IProject[]
    //   };
    // },
    methods: {
      navigateToItemForm() {
        // const id = project ? parse(project.href).id : '0';
        // this.$router.push({ name: 'project-form', params: { id: id } });
      }
    }
  });
</script>
<style lang="scss">
  #new-item .bootstrap-icon {
    margin-right: 8px !important;
    margin-top: -2px;
  }
</style>
