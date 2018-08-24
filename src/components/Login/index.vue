<template>
  <div class="modal-body" v-if="template==='default'">
    <form
      id="auth-form"
      @submit.prevent="login"
      v-if="showRestore === false"
    >

      <div class="auth-input-wrapper">
        <input
          :class="{
            'auth-input': true,
            'filled-input': phone.length === 15,
            'error-input': phone.length < 18 && phone
          }"
          type="text"
          placeholder="Телефон"
          v-model="phone"
          v-mask="'+7 (###) ###-##-##'"
          masked="true"
        />
      </div>

      <div class="auth-input-wrapper">
        <input
          :class="{
            'auth-input': true,
          }"
          type="password"
          v-model="password"
          placeholder="Пароль"
        />
      </div>

      <div class="info-block">
        <ul class="error-list">
          <li v-for="error in errors" :key="error" v-html="error"/>
        </ul>
        <a class="restore-pass-link" href="#" @click.prevent="showRestore = !showRestore">Забыли пароль?</a>
      </div>


      <button type="submit" class="send-btn" name="submit" :disabled="spinner">
        <Spinner v-if="spinner"/>
        <span :style="{'opacity': spinner ? 0 : 1}">Войти</span>
      </button>

    </form>

    <RestorePassword v-if="showRestore"/>

  </div>
  <div v-else-if="template==='small'">
    <div class="recieve-code-wrapper">
      <div class="auth-button">Авторизоваться</div>
      <div class="">
        <input type='checkbox' class='ios8-switch ios8-switch-lg' id='checkbox-3'>
        <label for='checkbox-3'></label>
      </div>
      <div class="reg-button">Зарегистрироваться</div>
    </div>
    <div class="recieve-code-wrapper" >
      <div class="small-wrapper phone-wrapper">
        <input class="small-input2"
               type="text"
               placeholder="Номер телефона в любом формате"
               required>
      </div>
      <div class="small-wrapper phone-wrapper" >
        <input
          class="small-input2"
          type="password"
          placeholder="Пароль"
          required>
      </div>
    </div>
    <div class="recieve-code-wrapper" style="justify-content: flex-end;" >
      <div class="send-again-link"  @click.prevent="showRestore = true">Напомнить?</div>
      <RestorePass v-if="showRestore === true"/>
    </div>
  </div>
</template>

<script>
import { actions as userActions } from '@/modules/user';
import RestorePassword from '@/components/RestorePassword';
import Spinner from '@/components/Spinner';

export default {
  name: 'Login',
  components: { Spinner, RestorePassword },
  props: {
    template: {
      default: 'default',
      type: String,
    },
  },
  data() {
    return {
      phone: '',
      password: '',
      showRestore: false,
      spinner: false,
      errors: [],
    };
  },
  mounted() {

  },
  methods: {
    login() {
      this.errors = [];
      this.spinner = true;
      const { phone, password } = this;

      const credentials = {
        username: phone ? phone.replace(/\D/g, '') : '',
        password,
      };

      this.$store.dispatch(userActions.login, credentials)
        .then((res) => {
          if (res && !res.error) {
            this.$modal.hide('auth');
            this.spinner = false;
            return;
          }
          this.errors.push('Неверные данные для входа');
          this.spinner = false;
        });
    },
  },
};
</script>
