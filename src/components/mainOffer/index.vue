<template>
  <div class="main-offer">
    <h1 class="main-title">Бесплатная доставка</h1>
    <div class="sub-title">burgerpizzoni.ru</div>
    <div class="mo pizza-mo">
      <div class="add-mo-to-cart">
        <div class="mo-to-cart-img"></div>
        <div class="mo-to-cart-text">Заказать</div>
      </div>
      <div class="chars">
        <div class="title">Наименование в две строки</div>
        <div class="ingrids">
          <div class="i-item">
            <span class="mod-name">мясо</span>
            <span class="mod-delete-icon"></span>
          </div>
          <div class="i-item">
            <span class="mod-name mod-name-deleted">лук</span>
            <span class="mod-return-icon"></span>
          </div>
          <div class="i-item">
            <span class="mod-name mod-name-deleted">помидоры</span>
            <span class="mod-return-icon"></span>
          </div>
          <div class="i-item">
            <span class="mod-name mod-name-deleted">помидоры</span>
            <span class="mod-return-icon"></span>
          </div>
          <div class="i-item">
            <span class="mod-name mod-name-deleted">помидоры</span>
            <span class="mod-return-icon"></span>
          </div>
          <div class="i-item">
            <span class="mod-name mod-name-deleted">помидоры</span>
            <span class="mod-return-icon"></span>
          </div>
          <div class="i-item">
            <span class="mod-name mod-name-deleted">помидоры</span>
            <span class="mod-return-icon"></span>
          </div>
          <div class="i-item">
            <span class="mod-name mod-name-deleted">перец</span>
            <span class="mod-return-icon"></span>
          </div>
          
        </div>
        <a class="i-add" @click.prevent="mods.include = !mods.include">добавить</a>
        <a class="i-more">развернуть</a>
        <div class="include-mods" >
        </div>
        <div class="sizes">
          <div class="btn mini-size active">мини</div>
          <div class="btn middle-size">мидл</div>
          <div class="btn maxi-size">макси</div>
        </div>
        <div class="bottom">
          <div class="price">1 050<span>₽</span></div>
          <div class="weight">1125 г.</div>
          <button class="in-basket" v-show="!showCounter" @click="showCounter = !showCounter">В корзину</button>
          <div v-show="showCounter" class="counter-block">
            <button class="counter">−</button>
            <span class="label-counter">1</span>
            <button class="counter">+</button>
          </div>
        </div>
      </div><!--chars-->
    </div>
    <div class="mo burger-mo">
      <div class="add-mo-to-cart">
        <div class="mo-to-cart-img"></div>
        <div class="mo-to-cart-text">Заказать</div>
      </div>
      <div class="chars">
        <div class="title">Наименование в две строки</div>
        <div class="ingrids">
          <div class="i-item">
            <span class="mod-name">мясо</span>
            <span class="mod-delete-icon"></span>
          </div>
          <div class="i-item">
            <span class="mod-name mod-name-deleted">лук</span>
            <span class="mod-return-icon"></span>
          </div>
          <div class="i-item">
            <span class="mod-name mod-name-deleted">помидоры</span>
            <span class="mod-return-icon"></span>
          </div>
          <div class="i-item">
            <span class="mod-name mod-name-deleted">помидоры</span>
            <span class="mod-return-icon"></span>
          </div>
          <div class="i-item">
            <span class="mod-name mod-name-deleted">помидоры</span>
            <span class="mod-return-icon"></span>
          </div>
          <div class="i-item">
            <span class="mod-name mod-name-deleted">помидоры</span>
            <span class="mod-return-icon"></span>
          </div>
          <div class="i-item">
            <span class="mod-name mod-name-deleted">помидоры</span>
            <span class="mod-return-icon"></span>
          </div>
          <div class="i-item">
            <span class="mod-name mod-name-deleted">перец</span>
            <span class="mod-return-icon"></span>
          </div>
          
        </div>
        <a class="i-add" @click.prevent="mods.include = !mods.include">добавить</a>
        <a class="i-more">развернуть</a>
        <div class="include-mods" >
        </div>
        <div class="sizes">
          <div class="btn mini-size active">мини</div>
          <div class="btn middle-size">мидл</div>
          <div class="btn maxi-size">макси</div>
        </div>
        <div class="bottom">
          <div class="price">1 050<span>₽</span></div>
          <div class="weight">1125 г.</div>
          <button class="in-basket" v-show="!showCounter" @click="showCounter = !showCounter">В корзину</button>
          <div v-show="showCounter" class="counter-block">
            <button class="counter">−</button>
            <span class="label-counter">1</span>
            <button class="counter">+</button>
          </div>
        </div>
      </div><!--chars-->
    </div>
  </div>
</template>
<script>
import "./style.scss";
export default {};
</script>
