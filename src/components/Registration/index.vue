<template>
  <div>
      <div class="modal-body">
        <div class="hello-message" v-if="regStep === 2">Введите код из смс для активации</div>
        <form v-if="regStep === 1"  @submit.prevent="register">
          <div class="auth-input-wrapper">
            <input
              class="auth-input"
              type="text"
              v-model="name"
              placeholder="Имя"
            />
          </div>

          <div class="auth-input-wrapper">
            <input
              class="auth-input filled-input"
              type="text"
              placeholder="Телефон"
              v-model="phone"
              v-mask="'7-###-###-##-##'" masked="false"
            />
          </div>

          <div class="auth-input-wrapper">
            <input
              class="auth-input"
              type="password"
              v-model="password"
              placeholder="Пароль"
            />
          </div>

          <div class="auth-input-wrapper">
            <input
              type="password"
              class="auth-input error-input"
              v-model="passwordConfirm"
              placeholder="Подтверждение пароля"
            />
          </div>

          <ul class="error-list" v-if="errors.length">
            <li v-for="error in errors" :key="error" v-html="error"/>
          </ul>

          <button type="submit" class="send-btn">Зарегистрироваться</button>

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

          <ul class="error-list" v-if="errors.length">
            <li v-for="error in errors" :key="error" v-html="error"/>
          </ul>

          <button type="submit" class="send-btn" name="submit">Зарегистрироваться</button>

        </form>
      </div>
  </div>
</template>

<script>
export default {
  name: "Registration",
  data() {
    return {
      regStep: 1,
      name: "",
      phone: "",
      password: "",
      passwordConfirm: "",
      code: "",
      errors: []
    };
  },
  methods: {
    register() {
      const isValid = this.checkForm();

      if (isValid) {
        const { name, phone, password } = this;

        const data = {
          name,
          phone: phone.replace(/-/g, ""),
          password
        };

        this.$http
          .post("http://apitest.burgerpizzoni.ru/api/Profiles/regStep1", data)
          .then(response => {
            if (!response.data.error) {
              this.regStep = 2;
            } else {
              this.errors.push(response.data.error.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    activate() {
      const isValid = this.checkForm();

      if (isValid) {
        const { code, phone, password } = this;

        const data = {
          code,
          phone,
          password
        };

        const credentials = {
          username: phone.replace(/-/g, ""),
          password
        };

        this.$http
          .post("http://apitest.burgerpizzoni.ru/api/Profiles/regStep2", data)
          .then(response => {
            if (!response.data.error) {
              this.getAuthUser(credentials).then(authUser => {
                console.log(authUser);
                if (typeof authUser != "undefined") {
                  this.$store.commit("setAuthUser", { value: authUser });
                  this.$cookie.set("authUser", JSON.stringify(authUser), 1);
                  this.$modal.hide("register");
                } else {
                  this.getAuthUser(credentials).then(authUser => {
                    if (typeof authUser != "undefined") {
                      this.$store.commit("setAuthUser", { value: authUser });
                      this.$cookie.set("authUser", JSON.stringify(authUser), 1);
                      this.$modal.hide("register");
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
    },
    checkForm() {
      const { regStep, name, phone, password, passwordConfirm, code } = this;

      this.errors = [];

      if (regStep === 1) {
        if (!name) {
          this.errors.push("Укажите имя");
        }
        if (!phone) {
          this.errors.push("Укажите телефон");
        }
        if (!password) {
          this.errors.push("Укажите пароль");
        }
        if (password.length < 6) {
          this.errors.push("Длина пароля меньше 6 символов");
        }
        if (password != passwordConfirm) {
          this.errors.push("Пароли не совпадают");
        }
      }

      if (regStep === 2) {
        if (!code) {
          this.errors.push("Укажите код");
        }
      }

      if (this.errors.length) return false;

      return true;
    }
  }
};
</script>

