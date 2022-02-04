<template>
  <div class="row">
    <div class="col-6">
      <k-section-header>
        Stack
      </k-section-header>
    </div>
    <div class="col-6 text-end">
      <vue-multiselect 
        :model-value="stack" 
        :options="stacks" 
        track-by="name" 
        label="name" 
        placeholder="Choose stack"
        @select="$emit('select', $event)">
      </vue-multiselect>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <b-card
        no-body
        class="active-stack"
        bg-variant="light"
        tabindex="0">
        <b-card-body class="p-1">
          <div class="row mx-0 align-items-center">
            <div class="col-8">
              <div class="row" v-if="stack?.description">
                <div class="col-12 ps-1">
                  {{ stack?.description }}
                </div>
              </div>
              <div class="row mb-1">
                <div class="col-12 ps-1">
                  <k-tag-list v-if="stack" :tags="stack.tags"></k-tag-list>
                </div>
              </div>
            </div>
            <div class="col-4 pe-0 text-end">
              <k-button-edit @activate="$emit('edit', stack)"></k-button-edit>
              <k-button-pin @activate="$emit('set', stack)"></k-button-pin>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Stack } from '../stacks/stack-models';
  import KSectionHeader from '@/shared/k-section-header.vue';
  import VueMultiselect from 'vue-multiselect';
  import KTagList from '@/shared/k-tag-list.vue';

  export default defineComponent({
    name: 'ActiveStack',
    emits: ['select', 'edit', 'set'],
    components: {
      KSectionHeader,
      VueMultiselect,
      KTagList
    },
    props: {
      stack: {
        type: Stack,
        required: false
      },
      isActive: {
        type: Boolean,
        required: true
      },
      stacks: {
        type: Array as PropType<Stack[]>,
        required: true
      }
    }
  });
</script>
