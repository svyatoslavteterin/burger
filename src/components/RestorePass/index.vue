<template>
  <div>
    <div class="hello-message" v-if="restoreStep === 1">Восстановление пароля</div>
    <div class="hello-message" v-if="restoreStep === 2">Введите код из смс и заполните поля</div>
    <form
      name="restorepassword"
      action="/"
      method="post"
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
          v-mask="'7-###-###-##-##'"
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
        @click.prevent="restoreStep = 2"
      >
        Отправить
      </button>

    </form>
    
    <form
      name="restorepassword2"
      action="/"
      method="post"
      @submit.prevent="activateNewPassword"
      id="restorepassword-form2"
      v-if="restoreStep === 2"
    >
          
      <div class="auth-input-wrapper">
        <input
          type="hidden"
          class="auth-input"
          name="phone"
          placeholder="Телефон"
          v-model="phone"
          v-mask="'7-###-###-##-##'"
          masked="false"
        />
      </div>
      <div class="auth-input-wrapper">
        <input
          type="text"
          class="auth-input"
          name="code"
          placeholder="Код из смс"
        />
      </div>
      <div class="auth-input-wrapper">
        <input
          type="password"
          class="auth-input"
          name="password"
          placeholder="Пароль"
          v-model="password"
        />
      </div>
      <div class="auth-input-wrapper">
        <input
          type="password"
          class="auth-input"
          name="password_confirm"
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
export default {
  name: "RestorePass",
  data() {
    return {
      name: "",
      phone: "",
      password: "",
      passwordConfirm: "",
      code: "",
      errors: [],
      restoreStep: 1
    };
  },
  methods: {
    checkForm: function(e) {
      let form = document.forms[e.srcElement.id.toString()];

      this.errors = [];

      if (typeof form.fullname != "undefined" && !form.fullname.value) {
        this.errors.push("Укажите имя");
      }
      if (!form.phone.value) {
        this.errors.push("Укажите телефон");
      }
      if (typeof form.password != "undefined" && !form.password.value) {
        this.errors.push("Укажите пароль");
      }
      if (typeof form.password != "undefined" && form.password.length < 6) {
        this.errors.push("Длина пароля меньше 6 символов");
      }
      if (
        typeof form.password != "undefined" &&
        form.password.value != form.password_confirm.value
      ) {
        this.errors.push("Пароли не совпадают");
      }
      if (typeof form.code != "undefined" && !form.code.value) {
        this.errors.push("Укажите код");
      }

      if (this.errors.length === 0) return true;
      e.preventDefault();
    },
    getRestoreCode: function(e) {
      if (this.checkForm(e)) {
        let formData = new FormData(
          document.querySelector("#restorepassword-form")
        );
        let data = {};
        data.phone = formData.get("phone").replace(new RegExp("-", "g"), "");

        this.$http
          .post("https://apitest.burgerpizzoni.ru/api/Profiles/resetPass", data)
          .then(response => {
            if (!response.data.error) {
              this.$modal.hide("restorepassword");
              this.$modal.show("restorepassword2");
            } else {
              this.errors.push(response.data.error.message);
            }
          })
          .catch(error => {
            console.log(error.message);
          });
      }
    },
    activateNewPassword: function(e) {
      if (this.checkForm(e)) {
        let formData = new FormData(
          document.querySelector("#restorepassword-form2")
        );
        let data = {};
        data.code = formData.get("code");
        data.phone = formData.get("phone").replace(new RegExp("-", "g"), "");
        data.password = formData.get("password");

        let credentials = { username: data.phone, password: data.password };

        this.$http
          .post(
            "http://apitest.burgerpizzoni.ru/api/Profiles/checkCodeResetPassword",
            data
          )
          .then(response => {
            if (!response.data.error) {
              this.getAuthUser(credentials).then(authUser => {
                console.log(authUser);
                if (typeof authUser != "undefined") {
                  this.$store.commit("setAuthUser", { value: authUser });
                  this.$cookie.set("authUser", JSON.stringify(authUser), 1);
                  this.$modal.hide("restorepassword2");
                } else {
                  this.getAuthUser(credentials).then(authUser => {
                    if (typeof authUser != "undefined") {
                      this.$store.commit("setAuthUser", { value: authUser });
                      this.$cookie.set("authUser", JSON.stringify(authUser), 1);
                      this.$modal.hide("restorepassword2");
                    }
                  });
                }
              });
            } else {
              this.errors.push(response.data.error.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

