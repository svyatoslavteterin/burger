<template>
  <div class="modal-body">
    <form 
      id="auth-form"
      @submit.prevent="auth"
      v-if="showRestore === false"
    >
      
      <div class="auth-input-wrapper">
        <input 
          :class="{
            'auth-input': true,
            'filled-input': phone.length === 15,
            'error-input': phone.length < 15 && phone
          }"
          type="text"
          placeholder="Телефон"
          v-model="phone" 
          v-mask="'7-###-###-##-##'" 
          masked="false"
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
        <div>
          <ul class="error-list" v-if="errors.length">
            <li v-for="error in errors" :key="error" v-html="error"/>
          </ul>
        </div>
        <a class="restore-pass-link" href="#" @click.prevent="showRestore = true">Забыли пароль?</a>
      </div>
      

      <button type="submit" class="send-btn" name="submit">Войти</button>

    </form>

    <RestorePass v-if="showRestore === true" />
    
  </div> 
</template>

<script>
import RestorePass from "@/components/RestorePass";

export default {
  name: "Login",
  components: { RestorePass },
  data() {
    return {
      phone: "",
      password: "",
      showRestore: false,
      errors: []
    };
  },
  methods: {
    auth() {
      const { username, password } = this;

      const credentials = {
        username: username ? username.replace(/-/g, "") : "",
        password
      };

      this.getAuthUser(credentials).then(authUser => {
        console.log("authUser", authUser);
        if (!authUser) return;

        this.$store.commit("setAuthUser", { value: authUser });
        this.$cookie.set("authUser", JSON.stringify(authUser), 1);
        this.$modal.hide("login");
      });
    },
    async getAuthUser(credentials) {
      this.$http
        .post("http://apitest.burgerpizzoni.ru/api/Profiles/login", credentials)
        .then(res => res.data)
        .catch(() => {
          this.errors.push("Неверные данные для входа");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


