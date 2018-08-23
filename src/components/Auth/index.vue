<template>
  <modal
    name="auth"
    class="auth"
    height="auto"
    :classes="`v--modal fixed-height--modal`"
    @opened="openedModal"
    @closed="closedModal"
    adaptive
    v-cloak
  >
    <div class="modal-header">
      <button @click="$modal.hide('auth')" class="info-modal-close"></button>
      <div class="info-yellow-block">Вход</div>
      <div
        @click="activeTab = 1"
        :class="{'tab-name': true, 'active': activeTab == 1 }"
      >
        Есть логин/пароль
      </div>
      <div
        @click="activeTab = 2"
        :class="{'tab-name': true, 'active': activeTab == 2 }"
      >
        Регистрация
      </div>
    </div>
    <div v-if="activeTab == 1" class="modal-wrapper">

      <Login />

    </div> <!--modal-wrapper-->

    <div v-if="activeTab == 2" class="modal-wrapper">

      <Registration />

    </div> <!--modal-wrapper-->
  </modal>
</template>
<script>
import Login from '@/components/Login';
import Registration from '@/components/Registration';
import modalActions from '@/mixins/modalActions';

export default {
  name: 'Auth',
  mixins: [modalActions],
  components: { Login, Registration },
  data() {
    return {
      okButton: false,
      okDelivery: false,
      okSelfDelivery: false,
      activeTab: 1,
      q: '',
    };
  },
};
</script>

<style lang="scss">
@import './_styles.scss';
</style>

