<template>
  <div class="user-view container pb-2 my-5" v-if="isReady">
    <div class="row py-3">
      <div class="col-12">
        <h1>User</h1>
      </div>
    </div>
    <div class="row py-3">
      <div class="col-12">
        <user-edit-form v-model="user" :stacks="stacks"></user-edit-form>
      </div>
    </div>
    <div class="row py-3">
      <div class="col-6">
        <button type="button" @click="save" class="btn btn-outline-success me-2" alt="Save">
          <b-icon icon="save" size="2x"></b-icon>
        </button>
        <button type="button" @click="cancel" class="btn btn-outline-secondary" alt="Cancel">
          <b-icon icon="backspace" size="2x"></b-icon>
        </button>
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

  export default defineComponent({
    name: 'StackView',
    components: {
      UserEditForm
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
          await this.navigateHome();
        } catch (e) {
          this.notificationService.notifyError('Save failed.', 'Error', e);
        }
      },
      async cancel(): Promise<void> {
        await this.navigateHome();
      },
      async navigateHome(): Promise<void> {
        await this.$router.push({ path: '/' });
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
