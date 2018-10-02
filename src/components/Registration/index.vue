<template>
  <div>
      <div class="modal-body">
        <div class="hello-message" v-if="regStep === 2">Введите код из смс для активации</div>
        <form v-if="regStep === 1"  @submit.prevent="register">
          <div class="auth-input-wrapper">
            <input
              :class="{
                'auth-input': true,
                'filled-input': name.length >= 2,
                'error-input': name.length < 2 && name
              }"
              type="text"
              v-model="name"
              placeholder="Имя"
            />
          </div>

          <div class="auth-input-wrapper">
            <input
              :class="{
                'auth-input': true,
                'filled-input': phone.length === 18,
                'error-input': phone.length < 18 && phone
              }"
              type="text"
              placeholder="Телефон"
              v-model="phone"
              v-mask="'+7 (###) ###-##-##'"
              masked="false"
            />
          </div>

          <div class="auth-input-wrapper">
            <input
              :class="{
                'auth-input': true,
                'filled-input': password.length >= 6,
                'error-input': password.length < 6 && password
              }"
              type="password"
              v-model="password"
              placeholder="Пароль"
            />
          </div>

          <div class="auth-input-wrapper">
            <input
              type="password"
              :class="{
                'auth-input': true,
                'filled-input': passwordConfirm === password && passwordConfirm,
                'error-input': passwordConfirm !== password && passwordConfirm
              }"
              v-model="passwordConfirm"
              placeholder="Подтверждение пароля"
            />
          </div>

          <ul class="error-list">
            <li v-for="error in errors" :key="error" v-html="error"/>
          </ul>

          <button type="submit" class="send-btn" :disabled="spinner">
            <Spinner v-if="spinner" />
            <span :style="{'opacity': spinner ? 0 : 1}">
              Зарегистрироваться
            </span>
          </button>

        </form>

        <form v-if="regStep === 2" @submit.prevent="activate">

          <div class="auth-input-wrapper">
            <input
              class="auth-input"
              type="text"
              v-model="code"
              placeholder="Код из смс"
            />
          </div>

          <ul class="error-list">
            <li v-for="error in errors" :key="error" v-html="error"/>
          </ul>

          <button type="submit" class="send-btn" name="submit">Зарегистрироваться</button>

        </form>
      </div>
  </div>
</template>

<script>
import { actions as userActions } from '@/modules/user';
import Spinner from '@/components/Spinner';

export default {
  name: 'Registration',
  components: { Spinner },
  data() {
    return {
      regStep: 1,
      spinner: false,
      name: '',
      phone: '',
      password: '',
      passwordConfirm: '',
      code: '',
      errors: [],
    };
  },
  methods: {
    register() {
      const isValid = this.checkForm();

      if (isValid) {
        this.spinner = true;
        const { name, phone, password } = this;

        const credentials = {
          name,
          phone: phone.replace(/\D/g, ''),
          password,
        };

        this.$store.dispatch(userActions.regStep1, credentials)
          .then((res) => {
            if (res && !res.error) {
              this.regStep = 2;
              this.spinner = false;
            } else {
              this.spinner = false;
              this.errors.push('Пользователь уже зарегистрирован');
            }
          });
      }
    },
    activate() {
      const isValid = this.checkForm();

      if (isValid) {
        const { code, phone, password } = this;

        const credentials = {
          code,
          phone: phone.replace(/\D/g, ''),
          password,
        };

        this.$store.dispatch(userActions.regStep2, credentials)
          .then((res) => {
            if (!res.error) {
              this.$modal.hide('auth');
            } else {
              this.errors.push('Неверный код подтверждения');
            }
          });
      }
    },
    checkForm() {
      const {
        regStep, name, phone, password, passwordConfirm, code,
      } = this;

      this.errors = [];

      if (regStep === 1) {
        if (!name) {
          this.errors.push('Укажите имя');
        }
        if (!phone) {
          this.errors.push('Укажите телефон');
        }
        if (!password) {
          this.errors.push('Укажите пароль');
        }
        if (password.length < 6) {
          this.errors.push('Длина пароля меньше 6 символов');
        }
        if (password !== passwordConfirm) {
          this.errors.push('Пароли не совпадают');
        }
      }

      if (regStep === 2) {
        if (!code) {
          this.errors.push('Укажите код');
        }
      }

      if (this.errors.length) return false;

      return true;
    },
  },
};
</script>

