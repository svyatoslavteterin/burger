<template>
<section id="cart">
  <div class="container">
    <CartHead/>
    <ol class=cart-block>
      <CartList
        v-for="item in orderDishes"
        :key="item.id"
        :data="item"
      />
    </ol>
    <div class="drink-title">Желаете напитки?</div>
    <div class="nav-block">
      <Search />
      <MainMenu />
    </div>
    <div class="drinks">
      <div class="drink">
        <div class="pic">
          <img src="./img/drink.jpg" alt="">
        </div> <!--pic-->
        <div class="chars">
          <div class="title">Кока-кола 0</div>
          <div class="sizes">
            <button class="btn">300 мл</button>
            <button class="btn">500 мл</button>
          </div>
          <div class="bottom-row">
            <div class="price"><span>1 950 P</span></div>
            <div class="counter-block">
              <button class="counter">−</button>
              <span class=" label-counter">2</span>
              <button class="counter" >+</button>
            </div>
          </div>
          <div class="in-additional-order">В корзину</div>
        </div>
      </div> <!--drink-->
      <div class="drink">
        <div class="pic">
          <img src="./img/drink.jpg" alt="">
        </div> <!--pic-->
        <div class="chars">
          <div class="title">Кока-кола 0</div>
          <div class="sizes">
            <button class="btn">300 мл</button>
            <button class="btn">500 мл</button>
          </div>
          <div class="bottom-row">
            <div class="price"><span>1 950 P</span></div>
            <div class="counter-block">
              <button class="counter">−</button>
              <span class=" label-counter">2</span>
              <button class="counter" >+</button>
            </div>
          </div>
          <div class="in-additional-order">В корзину</div>
        </div>
      </div> <!--drink-->
      <div class="drink">
        <div class="pic">
          <img src="./img/drink.jpg" alt="">
        </div> <!--pic-->
        <div class="chars">
          <div class="title">Кока-кола 0</div>
          <div class="sizes">
            <button class="btn">300 мл</button>
            <button class="btn">500 мл</button>
          </div>
          <div class="bottom-row">
            <div class="price"><span>1 950 P</span></div>
            <div class="counter-block">
              <button class="counter">−</button>
              <span class=" label-counter">2</span>
              <button class="counter" >+</button>
            </div>
          </div>
          <div class="in-additional-order">В корзину</div>
        </div>
      </div> <!--drink-->
      <div class="drink">
        <div class="pic">
          <img src="./img/drink.jpg" alt="">
        </div> <!--pic-->
        <div class="chars">
          <div class="title">Кока-кола 0</div>
          <div class="sizes">
            <button class="btn">300 мл</button>
            <button class="btn">500 мл</button>
          </div>
          <div class="bottom-row">
            <div class="price"><span>1 950 P</span></div>
            <div class="counter-block">
              <button class="counter">−</button>
              <span class=" label-counter">2</span>
              <button class="counter" >+</button>
            </div>
          </div>
          <div class="in-additional-order">В корзину</div>
        </div>
      </div> <!--drink-->
      <div class="drink">
        <div class="pic">
          <img src="./img/drink.jpg" alt="">
        </div> <!--pic-->
        <div class="chars">
          <div class="title">Кока-кола 0</div>
          <div class="sizes">
            <button class="btn">300 мл</button>
            <button class="btn">500 мл</button>
          </div>
          <div class="bottom-row">
            <div class="price"><span>1 950 P</span></div>
            <div class="counter-block">
              <button class="counter">−</button>
              <span class=" label-counter">2</span>
              <button class="counter" >+</button>
            </div>
          </div>
          <div class="in-additional-order">В корзину</div>
        </div>
      </div> <!--drink-->
    </div> <!--drinks-->
    <div class="delivery-pay-block">
      <div class="dp-wrapper">
        <label for="">Адрес доставки</label>
        <select name="" id="">
          <option value="123">123</option>
          <option value="123">123</option>
        </select>
      </div>
      <div class="dp-wrapper">
        <label for="">Способ оплаты</label>
        <select name="" id="">
          <option value="123">123</option>
          <option value="123">123</option>
        </select>
      </div>
      <div class="dp-wrapper">
        <label class="delivery-free-label">Доставка бесплатная!</label>
      </div>
    </div> <!--delivery-pay-block-->
    <div class="bonus-block">
      <div class="bonus-wrapper">
        <label>Бонусов на счёте: <span>300</span></label>
        <button class="finish-order">Использовать всё</button>
        <input type="text" value="150" class="bonus-input" />
      </div>
      <div class="itog">
        <span class="old-price">2956 Р</span>
        <span class="itog-price">2500 P</span>
        <button class="finish-order">Оформить заказ</button>
      </div>
    </div>
  </div> <!--container-->
</section>
</template>
<script>
import MainMenu from "@/components/newMainMenu";
import Search from "@/components/newSearch";
import CartHead from "./cart-head.vue";
import CartList from "./cart-list.vue";
import "./style.scss";

export default {
  name: "Cart",
  components: { CartHead, CartList, MainMenu, Search },
  mounted() {
    // скрыть мини-корзину тут
  },
  computed: {
    orderDishes() {
      console.log("cart:", this.$store.state);
      return this.$store.state.cart;
    },
    userBonuses() {
      return this.$store.getters.getCartSum;
    }
  },
  methods: {}
};
</script>
