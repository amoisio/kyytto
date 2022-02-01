<template>
  <div class="row">
    <div class="col-12">
      <k-two-part-header class="m-2">
        Stack
        <template v-slot:right>
          <vue-multiselect 
            :model-value="stack" 
            :options="stacks" 
            track-by="name" 
            label="name" 
            placeholder="Choose stack"
            @select="$emit('select', $event)">
          </vue-multiselect>
        </template>
      </k-two-part-header>
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
              <b-button
                class="p-0 me-1"
                variant="outline-secondary"
                @click.stop="$emit('edit', stack)"
                @keyup.enter.stop.prevent="$emit('edit', stack)">
                <b-icon icon="pencil" size="2x"></b-icon>
              </b-button>
              <b-button
                v-if="!isActive"
                class="p-0"
                variant="outline-warning"
                @click.stop="$emit('set', stack)"
                @keyup.enter.stop.prevent="$emit('set', stack)">
                <b-icon icon="pin-angle" size="2x"></b-icon>
              </b-button>
              <b-button
                v-else
                class="p-0"
                variant="warning">
                <b-icon icon="pin-angle" size="2x"></b-icon>
              </b-button>
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
  import KTwoPartHeader from '@/shared/k-two-part-header.vue';
  import VueMultiselect from 'vue-multiselect';
  import KTagList from '@/shared/k-tag-list.vue';

  export default defineComponent({
    name: 'ActiveStack',
    emits: ['select', 'edit', 'set'],
    components: {
      KTwoPartHeader,
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
