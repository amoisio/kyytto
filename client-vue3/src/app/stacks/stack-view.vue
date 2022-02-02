<template>
  <div class="stack-view container pb-2 my-5" v-if="isReady">
    <div class="row py-3">
      <div class="col-12">
        <k-page-header>Stack</k-page-header>
      </div>
    </div>
    <div class="row py-3">
      <div class="col-12">
        <stack-edit-form v-model="stack" :tags="tags"></stack-edit-form>
      </div>
    </div>
    <div class="row py-3">
      <div class="col-6">
        <k-button-danger class="me-1" icon="x" @activate="remove"></k-button-danger>
        <k-button icon="arrow-left-short" @activate="cancel"></k-button>
      </div>
      <div class="col-6 text-end">
        <k-button-success icon="arrow-down-short" @activate="save"></k-button-success>
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
  import { Tag } from '../tags/tag-models';
  import KPageHeader from '@/shared/k-page-header.vue';
  import KButtonDanger from '@/shared/k-button-danger.vue';
  import KButton from '@/shared/k-button.vue';
  import KButtonSuccess from '@/shared/k-button-success.vue';

  export default defineComponent({
    name: 'StackView',
    components: {
      StackEditForm,
      KPageHeader,
      KButtonDanger,
      KButton,
      KButtonSuccess
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
        stack: {} as Stack,
        tags: [] as Tag[]
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
        this.tags = await this.$services.tagService.getAll();
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
        await this.$router.back();
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
