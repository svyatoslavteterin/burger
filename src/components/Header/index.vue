<template>
    <header class="header">
        <div class="header-center">
            <div class="header-left-block">
                <a href="/"><img src="./img/logo.svg" alt="logo" class="logo"/></a>
                <a href="#city-select" class="select-city-link">Санкт Петербург</a>
            </div>
            <div class="header-center-block">
                <div class="number-block">
                    <div class="number">8(800) 250-80-70</div>
                    <div class="number2">ЗВОНОК БЕСПЛАТНЫЙ</div>
                </div>
            </div>
            <div v-if="login == 1" class="header-right-block1">
                <div class="price_block">
                    <div class="price"><span v-text="this.getCartSum"></span> ₽</div>
                </div>
                <router-link to="/cart"><div class="basket">Корзина</div></router-link>
                <a href="#" @click.prevent="login = 2" class="sign_in">Войти</a>
            </div>
            <div v-if="login == 2" class="header-right-block2">
                <div class="hello-block">
                    <div class="hello-block-text">Здравствуйте, Вячеслав</div>
                    <a href="#" class="hello-block-text2">это не я</a>
                </div>
                <input class="password-input" type="password" placeholder="Пароль"/>
                <a href="#" v-if="!checkLogin" @click.prevent="login = 3" class="basket">Войти</a>
            </div>
            <div v-if="login == 3" class="header-right-block3">
                <div class="price_block">
                    <div class="price"><span v-text="this.getCartSum"></span>₽</div>
                </div>
                <router-link to="/cart"><div class="basket">Корзина</div></router-link>
                <div class="person-info-block">
                    <img src="./img/person.png" alt="avatar" class="avatar"/>
                    <div class="person-info-block-texts">
                        <div class="person-info-block-name">вячеслав</div>
                        <div class="person-info-block-text">доп. инфо</div>
                    </div>
                    <img src="./img/icons_exit.svg" alt="exit" class="exit" href="#" v-if="!checkLogin"
                         @click.prevent="login = 1"/>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
  import "./style.scss";

  export default {
    data() {
      return {
        login: 1
      };
    },
    computed: {
      getCartSum: function () {
        let summ = 0;
        if (this.$store.state.cart.length > 0) {
          this.$store.state.cart.forEach(item => {
            let itemPrice = +item.price;
            if (item.mods.length > 0) {
              item.mods.forEach(mod => {
                itemPrice += +mod.summ;
              });
            }
            summ += itemPrice * item.count;
          });
        }
        return summ;
      },
    }
  };
</script>

