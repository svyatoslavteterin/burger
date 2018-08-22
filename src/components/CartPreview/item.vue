<template>
    <div class="preview-cart-item">

      <div class="image-wrapper">
        <img :src="getImage" alt="food"/>
      </div>

      <div class="item-info">

        <div class="item-controls">
          <div class="item-title">
            {{ dish.categName }}
            <span class="size">|&nbsp;{{dish.dishName}}</span>
          </div>
          <div class="controls-counter">
            <button class="" @click="minusDish(dish)">-</button>
            <span class="ui-amount-control-value" v-text="dish.count" />
            <button @click="plusDish(dish)">+</button>
          </div>
          <a href="#" class="remove-dish" @click="removeDish(dish)">удалить</a>
        </div>

        <!-- <ul class="item-mods">
          <div v-if="data.mods.length" class="item-mods--title">Добавлено к заказу</div>
          <li
            v-for="mod in data.mods"
            :key="mod.id"
          >
            <span class="item-mods--name" v-text="mod.name" />
            <div class="dashed-line" />
            <span class="item-mods--price" v-text="`${+mod.price} ₽`" />
            <span class="item-mods--count" v-text="mod.count" />
            <button @click="removeMod(mod.id)">x</button>
          </li>
        </ul> -->

        <div class="item-price-and-weight">
          <div class="item-price" v-html="$options.filters.Rub(dish.Price)" />
          <div class="item-weight" v-text="`${dish.fullData.ExitMass} г`" />
        </div>

      </div>

    </div>
</template>

<script>
import { actions as cartActions } from '@/modules/cart';

export default {
  props: {
    dish: Object,
  },
  computed: {
    getImage() {
      return `https://imgtest.burgerpizzoni.ru/_img/Rest/${
        this.dish.fullData.Images[0].ImageName
      }`;
    },
  },
  methods: {
    removeDish(dish) {
      console.log(dish);
      this.$store.dispatch(cartActions.removeDishFromCart, dish);
    },
    plusDish(dish) {
      dish.count += 1;
    },
    minusDish(dish) {
      if (dish.count === 1) return;
      dish.count -= 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.preview-cart-item {
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  border-bottom: 1px solid lightgray;
  padding-bottom: 15px;
  margin-top: 15px;

  .image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15%;
    width: 16%;
    border-radius: 100%;
    margin-right: 15px;
    overflow: hidden;

    img {
      width: 60px;
      height: auto;
      transform: scale(1.65);
    }
  }

  .item-info {
    width: 100%;

    .item-controls {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      .item-title {
        font-size: 1.3rem;
        color: black;
        font-weight: bold;

        span {
          font-weight: normal;
          color: #b2b2b2;
          text-align: right;
        }
      }

      .controls-counter {
        margin-left: 0.5rem;
        margin-right: 1.5rem;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        border: none;

        .ui-amount-control-value {
          width: 2rem;
          position: relative;
          top: 0.15rem;
          font-size: 1.25rem;
          text-align: center;
          line-height: 1;
        }

        button {
          text-align: center;
          border: 1px solid black;
          border-radius: 100%;
          width: 1.25rem;
          height: 1.25rem;
          background-color: transparent;
          cursor: pointer;
          font-size: 1.25rem;
          padding-top: 0.025rem;
          padding-right: 0.025rem;
          line-height: 1;
          outline: none;

          &:hover {
            background-color: #ffd60f;
            border: 1px solid #ffd60f;
          }
        }
      }

      a {
        color: black !important;
        font-size: 1rem;
        display: flex;
        align-items: center;
        padding: 0.3rem 0.75rem;
        border: 1px solid black;
        border-radius: 3.6rem;
        max-height: 2rem;
        text-decoration: none;

        &:hover {
          background-color: #ffd60f;
          border: 1px solid #ffd60f;
        }
      }
    }

    .item-mods {
      padding: 0;
      margin: 0;
      margin-bottom: 1rem !important;
      list-style: none;

      &--title {
        font-size: 1rem;
        color: black;
      }

      &--name {
        font-size: 1rem;
        color: gray;
      }

      li {
        display: flex;
        flex-flow: row nowrap;
        padding-right: 0.5rem;
      }

      .dashed-line {
        flex: 1;
        height: 1px;
        margin: auto 0.25rem 0.575rem;
        border-bottom: 1px dashed lightgray;
      }

      &--price {
        margin-left: auto;
        font-size: 1rem;
      }

      &--count {
        font-size: 1rem;
        color: black;
        margin-left: 1.25rem;
      }

      button {
        background: none;
        border: none;
        outline: none;
        box-shadow: none;
        cursor: pointer;
        font-size: 1.25rem;
        line-height: 1;
        margin-left: 1.25rem;
        padding-bottom: 0.2rem;

        &:hover {
          color: #ffd60f;
        }
      }
    }

    .item-price-and-weight {
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-end;

      .item-price {
        font-size: 1.75rem;
        margin-top: 1rem;
        color: black;
        line-height: 1;
      }

      .item-weight {
        font-size: 1rem;
        color: gray;
        line-height: 1;
        margin-bottom: 0.1rem;
        margin-left: 1.5rem;
      }
    }
  }
}
</style>
