<template>
  <div class="user-view container pb-2 my-5" v-if="isReady">
    <div class="row py-3">
      <div class="col-12">
        <k-page-header>User</k-page-header>
      </div>
    </div>
    <div class="row py-3">
      <div class="col-12">
        <user-edit-form v-model="user" :stacks="stacks"></user-edit-form>
      </div>
    </div>
    <div class="row py-3">
      <div class="col-6">
        <k-button-cancel @activate="cancel"></k-button-cancel>
      </div>
      <div class="col-6 text-end">
        <k-button-save @activate="save"></k-button-save>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import UserEditForm from './user-edit-form.vue';
  import { NotificationService } from '@/shared/notification-service';
  import { User } from './user-models';
  import { Stack } from '../stacks/stack-models';
  import KPageHeader from '@/shared/k-page-header.vue';

  export default defineComponent({
    name: 'UserView',
    components: {
      UserEditForm,
      KPageHeader
    },
    data() {
      return {
        isReady: false,
        user: {} as User,
        stacks: [] as Stack[]
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
        this.user = this.$authentication.user!;
        this.stacks = await this.$services.stackService.getAll();
      } catch (e) {
        this.notificationService.notifyError(`Loading a user details failed.`, 'Error', e);
      } finally {
        this.isReady = true;
      }
    },
    methods: {
      async save(): Promise<void> {
        const user = this.user;
        const errors = user.validate();
        if (errors.length > 0) {
          this.notificationService.notifyWarning(errors.join('\n'), 'Validation error');
          return;
        }
        try {
          await this.$services.userService.update(user);
          this.$authentication.user = user;
          this.notificationService.notifySuccess('User saved.');
          await this.navigateBack();
        } catch (e) {
          this.notificationService.notifyError('Save failed.', 'Error', e);
        }
      },
      async cancel(): Promise<void> {
        await this.navigateBack();
      },
      async navigateBack(): Promise<void> {
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
