<template>
  <modal name="login" height="auto" adaptive v-cloak>
    <h3 class="modal-header">Авторизация</h3>

    <div class="modal-body">
      <form 
        id="auth-form"
        @submit.prevent="auth"
      >

        <div v-if="errors.length">
          <b>Пожалуйста исправьте указанные ошибки:</b>
          <ul>
            <li 
              v-for="error in errors" 
              :key="error"
              v-html="error"
            />
          </ul>
        </div>
        
        <div class="form-group">
          <input 
            class="form-control"
            type="text"
            placeholder="Телефон"
            v-model="phone" 
            v-mask="'7-###-###-##-##'" 
            masked="false"
          />
        </div>

        <div class="form-group">
          <input 
            class="form-control"
            type="password"
            v-model="password"
            placeholder="Пароль"
          />
          <a href="#" @click.prevent="restorePassword">Забыли пароль?</a>
        </div>

        <div class="form-group">
          <button type="submit" class="form-control" name="submit">Отправить</button>
        </div>

        <div class="form-group">
          <a href="#" @click.prevent="openRegistration">Регистрация</a>
        </div>

      </form>
    </div>
    
    <button 
      class="modal-close"
      @click="$modal.hide('login')" 
      v-text="'x'"
    />
  </modal>  
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      phone: null,
      password: null,
      passwordConfirm: null,
      errors: [],
    }
  },
  methods: {
    auth() {
      const { username, password } = this;

      const credentials = {
        username: username ? username.replace(/-/g, '') : '',
        password
      };

      this.getAuthUser(credentials)
        .then(authUser => {
          console.log('authUser', authUser);
          if (!authUser) return;
          
          this.$store.commit("setAuthUser", {value: authUser});
          this.$cookie.set("authUser", JSON.stringify(authUser), 1);
          this.$modal.hide("login");
        });
    },
    async getAuthUser(credentials) {
      this.$http.post(
        'http://apitest.burgerpizzoni.ru/api/Profiles/login',
        credentials
      )
        .then((res) => res.data)
        .catch(() => {
          this.errors.push("Неверные данные для входа");
        });
    },
    openRegistration() {
      this.$modal.show('register');
      this.$modal.hide('login');
    }
  }
}
</script>

<style lang="scss" scoped>

</style>


