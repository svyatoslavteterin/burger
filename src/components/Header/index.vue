<template>
  <header class="header">
    <!-- use the modal component, pass in the prop -->
    <div class="header-center">
      <div class="header-left-block">

        <router-link to="/">
          <img src="./img/logo.svg" alt="logo" class="logo"/>
        </router-link>
        <a href="#city-select" class="select-city-link">Санкт Петербург</a>
      </div>
      <div class="header-center-block">
        <div class="number-block">
          <div class="number">8(800) 250-80-70</div>
          <div class="number2">ЗВОНОК БЕСПЛАТНЫЙ</div>
        </div>
      </div>
      <div v-if="getLogin == 1" class="header-right-block1">
        <div class="price_block">
          <div class="price"><span v-text="this.$store.getters.getCartSum"></span></div>
        </div>
        <div class="basket-wrapper">
          <router-link to="/cart" class="basket">Корзина</router-link>
          <BasketPreview/>
          <!-- <div v-if="basket == true" class="basket-block">
              <div class="triangle"></div>
              <div class="basket-block-food-block">
                  <div class="basket-block-food-block-left">
                      <div class="basket-block-food-image"></div>
                      <div class="food-name-and-price-block">
                          <div class="food-name">Куриная</div>
                          <div class="food-price">1050 ₽</div>
                      </div>
                      <div class="food-size-block">
                          <select class="size-selector">
                              <option>макси</option>
                              <option>мини</option>
                          </select>
                          <div class="food-weight">1125 г</div>
                      </div>
                  </div>
                  <div class="basket-block-food-block-right">
                      <div class="amount-food-block">
                          <div class="plus-minus-block">
                              <div class="minus">-</div>
                          </div>
                          <div class="amount-food-num">2</div>
                          <div class="plus-minus-block">+</div>
                      </div>
                      <div class="delete-button">удалить</div>
                  </div>
              </div>
              <div class="basket-block-food-block">
                  <div class="basket-block-food-block-left">
                      <div class="basket-block-food-image"></div>
                      <div class="food-name-and-price-block">
                          <div class="food-name">маргарита</div>
                          <div class="food-price">270 ₽</div>
                      </div>
                      <div class="food-size-block">
                          <select class="size-selector">
                              <option>макси</option>
                              <option>мини</option>
                          </select>
                          <div class="food-weight">280 г</div>
                      </div>
                  </div>
                  <div class="basket-block-food-block-right">
                      <div class="amount-food-block">
                          <div class="plus-minus-block">-</div>
                          <div class="amount-food-num">1</div>
                          <div class="plus-minus-block">
                              <div class="plus">+</div>
                          </div>
                      </div>
                      <div class="delete-button">удалить</div>
                  </div>
              </div>
              <div class="totals-block">
                  <div class="totals-text">
                      Итого:
                      <span class="totals-text-bold">1320 ₽</span>
                  </div>
                  <router-link to="/cart">
                      <div class="go-to-basket-button">перейти в корзину</div>
                  </router-link>
              </div>
          </div> -->
        </div>
        <a href="#" @click.prevent="$modal.show('auth')" class="sign_in">Войти</a>
      </div>
      <div v-if="getLogin == 2" class="header-right-block2">
        <div class="hello-block">
          <div class="hello-block-text">Здравствуйте, Вячеслав</div>
          <a href="#" class="hello-block-text2">это не я</a>
        </div>
        <input class="password-input" type="password" placeholder="Пароль"/>
        <a href="#" v-if="!checkLogin" @click.prevent="login = 3" class="basket">Войти</a>
      </div>
      <div v-if="getLogin == 3" class="header-right-block3">
        <div class="price_block">
          <div class="price"><span v-text="this.$store.getters.getCartSum"></span></div>
        </div>
        <div class="basket">Корзина</div>
        <div class="person-info-block">
          <img src="./img/person.png" alt="avatar" class="avatar"/>
          <div class="person-info-block-texts">
            <div class="person-info-block-name" v-text="getAuthUser.userInfo.FirstName"></div>
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
  import BasketPreview from "@/components/BasketPreview";

  export default {
    components: {BasketPreview},
    data() {
      return {
        login: 1,
        basket: false,
        mods: {
          include: false,
          exclude: false
        }
      };
    },
    computed: {
      getLogin() {
        if (Object.keys(this.$store.state.authUser).length>0){
          return 3;
        }else{
          return 1;
        }
      },
      getAuthUser(){
        return this.$store.state.authUser;
      }
    }
  };
</script>

