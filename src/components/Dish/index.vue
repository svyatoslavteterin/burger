<template>
  <div
    :class="{
      'dish': true,
      'head-dish': headdish,
    }"
    v-if="showDish()"
  >

    <div class="dish-info">
      <span class="dish-info__name" v-text="categ.categName" />

      <div class="dish-info__techcard">
        <span
          v-for="(exMod, i) in currentDish.techCardData"
          :key="`techCardData-${exMod.FoodName}-${categ.id}-${i}`"
          :class="{
            'excluded': currentDish.excludes.find(ex => ex.id_Food === exMod.id_Food)
          }"
        >
          {{exMod.FoodName}}
          <button
            @click="excludeMod(currentDish, exMod)"
            v-text="currentDish.excludes.find(ex => ex.id_Food === exMod.id_Food) ? '+' : 'x'"
          />
        </span>
      </div>

      <a
        class="i-add"
        @click.prevent="showMods = !showMods"
        v-if="categ.dishes[currentOption].ModGroups[1]"
      >
        добавить
      </a>

      <Mods
        v-if="showMods"
        :mods="categ.dishes[currentOption].ModGroups[1].mods"
        :dishId="categ.dishes[currentOption].id"
        @hide="showMods = !showMods"
      />

      <div v-if="categ.dishes.length > 1" class="dish-info__variants">
        <button
          v-for="(dish, i) in categ.dishes"
          :key="dish.id"
          v-if="showVaraint(dish)"
          v-text="dish.dishName"
          :class="{
            '': true,
            'active': currentOption === i
          }"
          @click="currentOption = i"
        />
      </div>

      <div class="dish-info__variant-info">
        <span
          class="variant-price"
          v-html="$options.filters.Rub(+currentDish.Price)"
        />
        <span
          class="variant-weight"
          v-text="`${currentDish.fullData.ExitMass} г`"
        />
        <div v-if="!currentDish.count">
          <button
            @click="addDishToCart(currentDish)"
            v-text="'В корзину'"
          />
        </div>
        <div v-else class='counter'>
          <button @click="minusDish(currentDish)" v-text="'-'"/>
          <span v-text="currentDish.count" />
          <button @click="plusDish(currentDish)" v-text="'+'"/>
        </div>
      </div>
    </div>

    <div class="dish-image">
      <div class="shadow" />
      <img :src="getImage" alt="">
    </div>

  </div>
</template>

<script>
import { actions as cartActions } from '@/modules/cart';
import Mods from '@/components/Mods';
import findIndex from 'lodash/findIndex';

export default {
  name: 'Dish',
  components: { Mods },
  props: {
    categ: Object,
    headdish: Boolean,
    customImg: String,
  },
  data() {
    return {
      currentOption: 0,
      showMods: false,
    };
  },
  computed: {
    getImage() {
      if (this.customImg) {
        return `.${this.customImg}`;
      }

      try {
        const imgName = this.categ
          .dishes[this.currentOption]
          .fullData
          .Images[0]
          .ImageName;

        return `https://imgtest.burgerpizzoni.ru/_img/Rest/${imgName}`;
      } catch (error) {
        return 'https://imgtest.burgerpizzoni.ru/_img/Rest/2575_empty.png';
      }
    },
    currentDish() {
      return this.categ.dishes[this.currentOption];
    },
    filterDishes() {
      return this.$store.getters.filterDishes;
    },
  },
  methods: {
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
      if (!this.filterDishes.length || this.headdish) return true;
      const res = this.filterDishes.filter(tag => String(tag) === dish.id);

      if (res.length) {
        return true;
      }

      return false;
    },
    showDish() {
      if (!this.filterDishes.length || this.headdish) return true;

      let count = 0;

      this.categ.dishes.forEach((dish) => {
        const a = this.filterDishes.filter(tag => String(tag) === dish.id);
        if (a.length) {
          count += 1;
        }
      });

      if (count >= this.categ.dishes.length) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './_styles.scss';
</style>

