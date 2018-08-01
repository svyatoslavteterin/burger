<template>
  <div>
    <modal name="register" height="auto" adaptive v-cloak>
      <h3 v-if="regStep === 1" class="modal-header">Регистрация</h3>
      <h3 v-if="regStep === 2" class="modal-header">Регистрация - введите код из смс для активации</h3>

      <div class="modal-body">
        <form v-if="regStep === 1"  @submit.prevent="register">

          <div v-if="errors.length">
            <b>Пожалуйста исправьте указанные ошибки:</b>
            <ul>
              <li v-for="error in errors" :key="error" v-html="error"/>
            </ul>
          </div>

          <div class="form-group">
            <input
              class="form-control"
              type="text"
              v-model="name"
              placeholder="Имя"
            />
          </div>

          <div class="form-group">
            <input
              class="form-control"
              type="text"
              placeholder="Телефон"
              v-model="phone"
              v-mask="'7-###-###-##-##'" masked="false"
            />
          </div>

          <div class=" form-group">
            <input
              class="form-control"
              type="password"
              v-model="password"
              placeholder="Пароль"
            />
          </div>

          <div class="form-group">
            <input
              type="password"
              class="form-control"
              v-model="passwordConfirm"
              placeholder="Подтверждение пароля"
            />
          </div>

          <div class="form-group">
            <button type="submit" class="form-control">Отправить</button>
          </div>

        </form>

        <form v-if="regStep === 2" @submit.prevent="activate">

          <div v-if="errors.length">
            <b>Пожалуйста исправьте указанные ошибки:</b>
            <ul>
              <li v-for="error in errors" :key="error" v-html="error"/>
            </ul>
          </div>

          <div class=" form-group">
            <input
              class="form-control"
              type="text"
              v-model="code"
              placeholder="Код из смс"
            />
          </div>

          <div class="form-group">
            <button type="submit" class="form-control" name="submit">Отправить</button>
          </div>

        </form>
      </div>

      <button
        class="modal-close"
        @click="$modal.hide('register')"
        v-text="'x'"
      />
    </modal>
  </div>
</template>

<script>
export default {
  name: 'Registration',
  data() {
    return {
      regStep: 1,
      name: '',
      phone: '',
      password: '',
      passwordConfirm: '',
      code: '',
      errors: []
    }
  },
  methods: {
    register() {
      const isValid = this.checkForm();

      if (isValid) {
        const { name, phone, password } = this;

        const data = {
          name,
          phone: phone.replace(/-/g, ''),
          password
        }

        this.$http.post("http://apitest.burgerpizzoni.ru/api/Profiles/regStep1", data)
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
          username: phone.replace(/-/g, ''), 
          password
        };

        this.$http
          .post("http://apitest.burgerpizzoni.ru/api/Profiles/regStep2", data)
          .then(response => {
              if (!response.data.error) {
                this.getAuthUser(credentials).then(authUser => {
                  console.log(authUser);
                  if (typeof authUser != "undefined") {
                    this.$store.commit("setAuthUser", {value: authUser});
                    this.$cookie.set("authUser", JSON.stringify(authUser), 1);
                    this.$modal.hide("register");
                  } else {
                    this.getAuthUser(credentials).then(authUser => {
                      if (typeof authUser != "undefined") {
                        this.$store.commit("setAuthUser", {value: authUser});
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
      const {
        regStep,
        name,
        phone,
        password,
        passwordConfirm,
        code
      } = this;

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
}
</script>

