<template>
  <div class="stack-view" v-if="isReady">
    <div class="row pb-3 pt-3">
      <div class="col-6 col-md-3">
        <h1>Stack</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <stack-edit-form v-model="stack"></stack-edit-form>
      </div>
    </div>
    <div class="row">
      <div class="col-6 col-md-3">
        <button type="button" @click="save" class="btn btn-outline-success me-2">Save</button>
        <button type="button" @click="cancel" class="btn btn-outline-secondary">Cancel</button>
      </div>
      <div class="col-6 col-md-3 text-end">
        <button type="button" @click="remove" class="btn btn-outline-danger">Remove</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import StackEditForm from './stack-edit-form.vue';
  import { Stack } from './stack-models';
  import { Identifier, IdentifierType } from 'kyytto-models';
  import { NotificationService } from '@/shared/notification-service';

  export default defineComponent({
    name: 'StackView',
    components: {
      StackEditForm
    },
    props: {
      id: {
        type: String as PropType<IdentifierType>,
        required: true,
        validator: (uuid: IdentifierType) => Identifier.isValidOrNil(uuid)
      }
    },
    data() {
      return {
        isReady: false,
        stack: {} as Stack
      };
    },
    computed: {
      notificationService(): NotificationService {
        return this.$services.notificationService;
      }
    },
    async created() {
      try {
        this.isReady = false;
        this.stack = Identifier.isNil(this.id)
          ? new Stack()
          : await this.$services.stackService.getById(this.id);
      } catch (e) {
        this.notificationService.notifyError(`Loading a stack with id ${this.id} failed.`, 'Error', e);
        await this.navigateToStacks();
      } finally {
        this.isReady = true;
      }
    },
    methods: {
      async save(): Promise<void> {
        const stack = this.stack;
        const errors = stack.validate();
        if (errors.length > 0) {
          this.notificationService.notifyWarning(errors.join('\n'), 'Validation error');
          return;
        }

        try {
          await this.$services.stackService.save(stack);
          this.notificationService.notifySuccess('Stack saved.');
          await this.navigateToStacks();
        } catch (e) {
          this.notificationService.notifyError('Save failed.', 'Error', e);
        }
      },
      async remove(): Promise<void> {
        const id = this.id;
        if (!Identifier.isValid(id)) {
          this.notificationService.notifyWarning(`Unable to remove stack. Id ${id} is invalid.`);
          await this.cancel();
          return;
        }

        try {
          await this.$services.stackService.delete(id);
          this.notificationService.notifySuccess('Stack removed.');
          await this.navigateToStacks();
        } catch (e) {
          this.notificationService.notifyError('Remove failed.', 'Error', e);
        }
      },
      async cancel(): Promise<void> {
        await this.navigateToStacks();
      },
      async navigateToStacks(): Promise<void> {
        await this.$router.push({ name: 'stacks' });
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
