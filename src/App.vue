<template>
  <div id="app">
    <headerModule/>
    <transition>
      <keep-alive>
        <router-view :menu="menu" :tags="tags" :foods="foods" :cartItems="cartItems"/>
      </keep-alive>
    </transition>

    <Auth/>

    <DetailInfo/>
    <Delivery></Delivery>
    <footerModule/>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>


<script>
import _ from "lodash";
import axios from "axios";
import headerModule from "@/components/Header";
import footerModule from "@/components/Footer";
import Auth from "@/components/Auth";
import DetailInfo from "@/components/DetailInfo";
import Delivery from "@/components/newDelivery";

export default {
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
  components: { headerModule, footerModule, Auth, DetailInfo, Delivery },
  data() {
    return {
      menu: [],
      ready: false,
      tags: {
        0: { idTag: 0, tagName: "Веганам", dishes: [163] },
        1: { idTag: 1, tagName: "С рыбой", dishes: [170, 203] },
        2: { idTag: 2, tagName: "С говядиной", dishes: [180] },
        3: { idTag: 3, tagName: "С курицей", dishes: [220] },
        4: { idTag: 4, tagName: "С индейкой", dishes: [244] },
        5: { idTag: 5, tagName: "С морепродуктами", dishes: [250] }
      },
      searchIndexes: {
        бургер: [203, 152]
      },
      filters: [
        "Веганам",
        "С рыбой",
        "С говядиной",
        "С курицей",
        "С индейкой",
        "С морепродуктами"
      ],
      errors: {
        register: {},
        login: {},
        register2: {},
        restorepassword: {},
        restorepassword2: {},
        payment: {},
        checkout: {}
      },
      phone: null,
      password: null,
      passwordConfirm: null
    };
  },
  updated: function() {},
  methods: {
    checkForm: function(e) {
      let form = document.forms[e.srcElement.id.toString()];
      let formName = form.getAttribute("name");

      this.errors[formName] = {};

      if (typeof form.fullname != "undefined" && !form.fullname.value) {
        this.errors[formName].fullname = "Укажите имя";
      }
      if (!form.phone.value) {
        this.errors[formName].phone = "Укажите телефон";
      }
      if (typeof form.password != "undefined" && !form.password.value) {
        this.errors[formName].password = "Укажите пароль";
      }
      if (typeof form.password != "undefined" && form.password.length < 6) {
        this.errors[formName].password = "Длина пароля меньше 6 символов";
      }
      if (
        typeof form.password != "undefined" &&
        form.password.value != form.password_confirm.value
      ) {
        this.errors[formName].password_confirm = "Пароли не совпадают";
      }
      if (typeof form.code != "undefined" && !form.code.value) {
        this.errors[formName].code = "Укажите код";
      }

      if (Object.keys(this.errors[formName]).length === 0) return true;
      e.preventDefault();
    },

    restorePassword: function() {
      this.$modal.hide("login");
      this.$modal.show("restorepassword");
    },
    getRestoreCode: function(e) {
      if (this.checkForm(e)) {
        let formData = new FormData(
          document.querySelector("#restorepassword-form")
        );
        let data = {};
        data.phone = formData.get("phone").replace(new RegExp("-", "g"), "");

        axios
          .post("https://apitest.burgerpizzoni.ru/api/Profiles/resetPass", data)
          .then(response => {
            if (!response.data.error) {
              this.$modal.hide("restorepassword");
              this.$modal.show("restorepassword2");
            } else {
              this.errors[e.target.getAttribute("name")][
                response.data.error.code
              ] =
                response.data.error.message;
              this.$forceUpdate();
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
              this.errors[e.target.getAttribute("name")][
                response.data.error.code
              ] =
                response.data.error.message;
              this.$forceUpdate();
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    showRegister: function() {
      this.$modal.hide("login");
      this.$modal.show("register");
    },
    register: function(e) {
      if (this.checkForm(e)) {
        let formData = new FormData(document.querySelector("#reg-form"));
        let data = {};
        data.name = formData.get("fullname");
        data.phone = formData.get("phone").replace(new RegExp("-", "g"), "");

        this.$http
          .post("http://apitest.burgerpizzoni.ru/api/Profiles/regStep1", data)
          .then(response => {
            if (!response.data.error) {
              this.$modal.hide("register");
              this.$modal.show("register2");
            } else {
              this.errors[e.target.getAttribute("name")][
                response.data.error.code
              ] =
                response.data.error.message;
              this.$forceUpdate();
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    beforeOpen: function() {},
    beforeClose: function() {},
    show(modalName) {
      this.$modal.show(modalName);
    },
    hide(modalName) {
      this.$modal.hide(modalName);
    }
  },
  created: function() {},
  computed: {
    checkLogin: function() {
      if (
        Object.keys(this.$store.state.authUser).length === 0 &&
        this.$store.state.authUser.constructor === Object
      ) {
        return 0;
      } else {
        return 1;
      }
    },
    userInfo: function() {
      return this.$store.state.authUser.userInfo.FirstName;
    },

      currentArea: function () {
        return this.$store.state.area;
      },
      foods: function () {
        if (this.menu[this.$store.state.area]) {
          let ids = [];
          if (this.$store.state.q.length > 4) {
            _.forOwn(this.searchIndexes, (dishes, word) => {
              if (word.toLowerCase().indexOf(this.$store.state.q) >= 0) {
                //dishes.forEach(dishId => {
                  ids.push(+dishes.id);
                //});
              }
            });

          let dishesIds = _.intersection(ids);

          return this.menu[this.$store.state.area].categs.filter(
            item => dishesIds.indexOf(+item.id) >= 0
          );
        }
        if (this.$store.state.filters) {
          this.$store.state.filters.forEach(idTag => {
            this.tags[idTag].dishes.forEach(dishId => {
              ids.push(dishId);
            });
          });

          let dishesIds = _.union(ids);
          if (dishesIds.length > 0) {
            return this.menu[this.$store.state.area].categs.filter(
              item => dishesIds.indexOf(+item.id) >= 0
            );
          }
        }

        return this.menu[this.$store.state.area].categs;
      }
    },
  },

  mounted: function () {
    this.$http
      .get("https://apitest.burgerpizzoni.ru/api/Menu/getMenu")
      .then(response => {
        this.menu = response.data.menu;
        this.$http.get("https://apitest.burgerpizzoni.ru/api/Menu/getIndexes").then((response)=>{
          this.searchIndexes=response.data;
          this.$http.get('https://apitest.burgerpizzoni.ru/api/Menu/getIndexesTags').then((response)=>{
            this.tags=response.data;
            this.ready = true;
          });
        });
      });
  }
};
</script>

