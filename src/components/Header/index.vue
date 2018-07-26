<template>
  <header class="header">
    <div class="header-center">
      <div class="header-left-block">
          <a href="/"><img src="./img/logo.svg" alt="logo" class="logo"/></a>
          <a href="#city-select" class="select-city-link">Санкт-Петербург</a>
      </div>
      <div class="header-right-block">
        <div class="number-block">
            <div class="number">8(800) 250-80-70</div>
            <div class="number2">ЗВОНОК БЕСПЛАТНЫЙ</div>
        </div>
        <div class="price_block">
            <div class="price">1990₽</div>
        </div>
        <div class="basket">Корзина</div>
        <a href="#" v-if="!checkLogin" @click.prevent="$modal.show('login')" class="sign_in">Войти</a>
      </div>
    </div>
  </header>  
</template>
<script>
import "./style.scss";

export default {};
</script>

