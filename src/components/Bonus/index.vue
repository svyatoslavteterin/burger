<template>
  <div class="bonus-block">
    <div class="bonus-wrapper">
      <label>Бонусов на счёте: <span v-text="userBonuses"></span></label>
      <button class="finish-order" >Использовать всё</button>
      <input type="text" v-model.number="userBonus" @keyup="checkMaxBonus" class="bonus-input" />
    </div>
    <div class="itog" v-if="userAuthorized">
      <span class="old-price">2956 Р</span>
      <span class="itog-price" v-html="$options.filters.Rub(cartSumm)"></span>
      <button class="finish-order" @click="checkout">Оформить заказ</button>
    </div>
    <div class="itog" v-else>
      <span class="itog-price" v-html="$options.filters.Rub(cartSumm)"></span>
      <button class="finish-order" @click.prevent="$modal.show('auth')">Войти и оформить</button>
    </div>
  </div>
</template>

<script>
import { actions as userActions } from '@/modules/user';
import { actions as cartActions } from '@/modules/cart';

export default {
  name: "Bonus",
  data() {
    const userBonus = this.$store.getters.user ?
      this.$store.getters.user.Bonus :
      0;
      
    return {
      userBonus
    }
  },
  computed: {
    cartSumm() {
      return this.$store.getters.cartSumm;
    },
    user() {
      console.log(this.$store.getters.user);
      return this.$store.getters.user;
    },
    userAuthorized() {
      const { user } = this.$store.getters;
      console.log('userAuthorized', user);
      if (user) {
        return true;
      }
      return false;
    },
    userBonuses() {
      const { user } =  this.$store.getters;
      if (user) {
        return user.Bonus;
      }
      return 0;
    },
  },
  methods: {
    
    checkMaxBonus() {
      return this.userBonus > this.userBonuses
        ? (this.userBonus = this.userBonuses)
        : true;
    },
  }
}
</script>

