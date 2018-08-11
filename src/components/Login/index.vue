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
        <ul class="error-list">
          <li v-for="error in errors" :key="error" v-html="error"/>
        </ul>
        <a class="restore-pass-link" href="#" @click.prevent="showRestore = true">Забыли пароль?</a>
      </div>


      <button type="submit" class="send-btn" name="submit" :disabled="spinner">
        <Spinner v-if="spinner"/>
        <span :style="{'opacity': spinner ? 0 : 1}">Войти</span>
      </button>

    </form>

    <RestorePass v-if="showRestore === true"/>

  </div>
</template>

<script>
  import RestorePass from "@/components/RestorePass";
  import Spinner from "@/components/Spinner";

  export default {
    name: "Login",
    components: {RestorePass, Spinner},
    data() {
      return {
        phone: "",
        password: "",
        showRestore: false,
        spinner: false,
        errors: []
      };
    },
    methods: {
      async auth() {
        this.errors = [];
        this.spinner = true;
        const {phone, password} = this;

        const credentials = {
          username: phone ? phone.replace(/-/g, "") : "",
          password
        };

        const authUser = await this.getAuthUser(credentials);
        this.$store.commit("setAuthUser", {value: authUser});
        this.$cookie.set("authUser", JSON.stringify(authUser), 1);
        this.$modal.hide("auth");

      },
      async getAuthUser(credentials) {
        try {
          const response = await this.$http.post("http://apitest.burgerpizzoni.ru/api/Profiles/login", credentials);
          this.spinner = false;
          return response.data
        } catch (e) {
          this.spinner = false;
          this.errors.push("Неверные данные для входа");
        }
      }
    }
  };
</script>
