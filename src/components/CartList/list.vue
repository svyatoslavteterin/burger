<template>

<div>
  <li class="cart-item">
    <div class="main-info">
      <div class="pic">
        <img :src="getImage" alt="">
      </div><!--pic-->
      <div class="chars">
        <div class="top">
          <div class="title">{{categ.categName}} <span class="size">|&nbsp;{{categ.dishName}}</span></div>
          <div class="ingrids">
            <span
              v-for="(exMod, i) in categ.techCardData"
              :key="`techCardData-${exMod.FoodName}-${categ.id}-${i}`"
              :class="{
                'excluded': categ.excludes.find(ex => ex.id_Food === exMod.id_Food)
              }"
            >
              {{exMod.FoodName}}
              <button
                @click="excludeMod(categ, exMod)"
                v-text="categ.excludes.find(ex => ex.id_Food === exMod.id_Food) ? '+' : 'x'"
              />
            </span>
          </div>
        </div>
        <div class="bottom">
          <div class="bottom-row">
            <div class="price"><span v-html="$options.filters.Rub(+categ.Price)"></span></div>
            <div class="weight"><span v-text="categ.fullData.ExitMass"></span> г</div>
            <div class='counter'>
              <button @click="minusDish(categ)" v-text="'−'"/>
              <span v-text="categ.count" />
              <button @click="plusDish(categ)" v-text="'+'"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="additional-with-order">
      <div class="close" @click="removeDish(categ)"></div>
      <span  v-if="haveMods" class="mods-title">Добавлено к заказу</span>
      <ul class="mods">
        <li
          v-for="mod in getAddedMods"
          :key="mod.ModName"
        >
          <span class="name" v-text="mod.ModName"></span>
          <div class="counter-block">
            <button class="counter" @click.prevent="minusMod(mod)">-</button>
            <span class="label-counter" v-text="mod.count"></span>
            <button class="counter" @click.prevent="plusMod(mod)">+</button>
          </div>
          <span class="sum" v-text="+mod.Price*mod.count+' ₽'"></span>
          <span :class="{ 'mod-delete-icon': true, hide:(mod.count < 2) }" @click.prevent="removeMod(mod)"></span>
        </li>
      </ul>
      <a
        v-if="haveMods"
        class="i-add"
        @click.prevent="showMods = !showMods"
      >
        добавить
      </a>
      <div class="include-mods">
        <Mods
          v-if="showMods"
          :mods="categ.ModGroups[1].mods"
          :dishId="categ.id"
          @hide="showMods = !showMods"
        />
      </div>
      <!-- <div class="dish-sum">Стоимость блюда: <span>{{getDishSum}} ₽</span></div> -->
    </div>
  </li>
</div> <!--конец-->
  
</template>

<script>
import { actions as cartActions } from '@/modules/cart';
import Mods from '@/components/Mods';
import findIndex from 'lodash/findIndex';

export default {
  name: 'List',
  components: { Mods },
  props: {
    categ: Object,
  },
  data() {
    return {
      showMods: false,
    };
  },
  computed: {
    haveMods() {
      // если есть группы с модификаторами, то показываем кнопку добавить (модификаторы) (единичка не спроста)
      return this.categ.ModGroups.length > 1 ? true : false;
    },
    getImage() {
      if (this.customImg) {
        return `.${this.customImg}`;
      }

      try {
        const imgName = this.categ
          .fullData
          .Images[0]
          .ImageName;

        return `https://imgtest.burgerpizzoni.ru/_img/Rest/${imgName}`;
      } catch (error) {
        return 'https://imgtest.burgerpizzoni.ru/_img/Rest/2575_empty.png';
      }
    },
    getAddedMods() {
      if (!this.categ.ModGroups[1]) return;

      const { mods } = this.categ.ModGroups[1];
      const sorted = mods.filter(item => item.count);
      return sorted;
    },
    filterDishes() {
      return this.$store.getters.filterDishes;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    plusMod(mod) {
      mod.count += 1;
    },
    minusMod(mod) {
      mod.count -= 1;
    },
    removeMod(mod) {
      mod.count = 0;
    },
    excludeMod(dish, item) {
      const idx = findIndex(
        dish.excludes,
        ['id_Food', item.id_Food],
      );

      if (idx >= 0) {
        dish.excludes.splice(idx, 1);
        return;
      }
      dish.excludes.push(item);
    },
    addDishToCart(dish) {
      dish.count = 1;
      dish.categName = this.categ.categName;
      this.$store.dispatch(cartActions.addDishToCart, dish);
      if (!this.user) {
        this.$modal.show('delivery');
      }
    },
    removeDish(dish) {
      this.$store.dispatch(cartActions.removeDishFromCart, dish);
    },
    plusDish(dish) {
      dish.count += 1;
    },
    minusDish(dish) {
      dish.count -= 1;
      if (!dish.count) {
        this.$store.dispatch(cartActions.removeDishFromCart, dish);
      }
    },
    showVaraint(dish) {
      if (!this.filterDishes.length) return true;
      const res = this.filterDishes.filter(tag => String(tag) === dish.id);

      if (res.length) {
        return true;
      }

      return false;
    },
  },
};
</script>

