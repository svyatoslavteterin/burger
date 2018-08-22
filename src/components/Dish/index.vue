<template>
  <div :class="{'dish': true, 'head-dish': headdish}">

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

      <div v-if="categ.dishes.length > 1" class="dish-info__variants">
        <button
          v-for="(dish, i) in categ.dishes"
          :key="dish.id"
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
import findIndex from 'lodash/findIndex';

export default {
  name: 'Dish',
  props: {
    categ: Object,
    headdish: Boolean,
    customImg: String,
  },
  data() {
    return {
      currentOption: 0,
    };
  },
  computed: {
    getImage() {
      if (this.customImg) {
        return `.${this.customImg}`;
      }

      const imgName = this.categ
        .dishes[this.currentOption]
        .fullData
        .Images[0]
        .ImageName;
      return `https://imgtest.burgerpizzoni.ru/_img/Rest/${imgName}`;
    },
    currentDish() {
      return this.categ.dishes[this.currentOption];
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
    },
  },
};
</script>

<style lang="scss" scoped>
@import './_styles.scss';
</style>

