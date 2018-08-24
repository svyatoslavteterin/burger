<template>
  <div>
    <div class="hello-message" v-if="restoreStep === 1">Восстановление пароля</div>
    <div class="hello-message" v-if="restoreStep === 2">Введите код из смс и заполните поля</div>
    <form
      @submit.prevent="getRestoreCode"
      id="restorepassword-form"
      v-if="restoreStep === 1"
    >
      <div class="auth-input-wrapper">
        <input
          class="auth-input"
          name="phone"
          placeholder="Телефон"
          v-model="phone"
          v-mask="'+7 (###) ###-##-##'"
          masked="false"
        />
      </div>

      <ul class="error-list" v-if="errors.length">
        <li v-for="error in errors" :key="error" v-html="error"/>
      </ul>

      <button
        type="submit"
        class="send-btn"
        name="submit"
        @click.prevent="getRestoreCode"
      >
        Отправить
      </button>

    </form>

    <form
      @submit.prevent="activateNewPassword"
      id="restorepassword-form2"
      v-if="restoreStep === 2"
    >
      <div class="auth-input-wrapper">
        <input
          :class="{
            'auth-input': true,
            'filled-input': code,
            'error-input': errorCode
          }"
          v-model="code"
          placeholder="Код из смс"
        />
      </div>
      <div class="auth-input-wrapper">
        <input
          :class="{
            'auth-input': true,
            'filled-input': password.length >= 6,
            'error-input': password && password.length < 6
          }"
          type="password"
          name="password"
          placeholder="Пароль"
          v-model="password"
        />
      </div>
      <div class="auth-input-wrapper">
        <input
          :class="{
            'auth-input': true,
            'filled-input': passwordConfirm && passwordConfirm === password ,
            'error-input': passwordConfirm && passwordConfirm !== password
          }"
          type="password"
          placeholder="Подтверждение пароля"
          v-model="passwordConfirm"
        />
      </div>

      <ul class="error-list" v-if="errors.length">
        <li v-for="error in errors" :key="error" v-html="error"/>
      </ul>

      <button type="submit" class="send-btn" name="submit">Отправить</button>

    </form>
  </div>
</template>

<script>
import { actions as userActions } from '@/modules/user';

export default {
  name: 'RestorePass',
  data() {
    return {
      phone: '',
      password: '',
      passwordConfirm: '',
      code: '',
      errorCode: false,
      errors: [],
      restoreStep: 1,
    };
  },
  methods: {
    checkForm(e) {
      const {
        phone,
        password,
        passwordConfirm,
        code,
        restoreStep,
      } = this;

      this.errors = [];

      if (restoreStep === 1) {
        if (!phone) {
          this.errors.push('Укажите телефон');
          return false;
        }
      }

      if (restoreStep === 2) {
        if (!code) {
          this.errors.push('Укажите код');
          this.errorCode = true;
          return false;
        }
        if (!password) {
          this.errors.push('Укажите пароль');
          return false;
        }
        if (password.length < 6) {
          this.errors.push('Длина пароля меньше 6 символов');
          return false;
        }
        if (password !== passwordConfirm) {
          this.errors.push('Пароли не совпадают');
          return false;
        }
      }

      return true;
    },
    getRestoreCode() {
      if (!this.checkForm()) return;
      const phone = this.phone.replace(/\D/g, '');


      this.$store.dispatch(userActions.resetPass, phone)
        .then((res) => {
          if (res.error) {
            this.error.push(res.error.message);
            return;
          }
          this.restoreStep = 2;
        });
    },
    activateNewPassword() {
      if (!this.checkForm()) return;

      const {
        phone,
        password,
        code,
      } = this;

      const credentials = {
        username: phone.replace(/\D/g, ''),
        password,
      };

      const data = {
        phone: phone.replace(/\D/g, ''),
        password,
        code,
      };

      this.$store.dispatch(userActions.checkCode, data)
        .then((res) => {
          if (res.error) {
            this.error.push(res.error.message);
            return;
          }
          this.$modal.hide('auth');
          setTimeout(() => {
            this.$store.dispatch(userActions.login, credentials);
          }, 500);
        });
    },
  },
};
</script>

