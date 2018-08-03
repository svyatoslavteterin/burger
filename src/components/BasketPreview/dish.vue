<template>
    <div class="preview-cart-item">

      <div class="image-wrapper">
        <img :src="getImage" alt="food"/>
      </div>

      <div class="item-info">

        <div class="item-controls">
          <div class="item-title">{{ data.dishExtName }}</div>
          <div class="controls-counter">
            <button class="" @click.prevent="decrement">-</button>
            <span class="ui-amount-control-value" v-text="getCount" />
            <button @click.prevent="increment">+</button>
          </div>
          <a href="#" class="remove-dish" @click.prevent="removeDish">удалить</a>
        </div>

        <ul class="item-mods">
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
        </ul>

        <div class="item-price-and-weight">
          <div class="item-price" v-text="`${+data.price} ₽`" />
          <div class="item-weight" v-text="`${data.fullData.ExitMass} г`" />
        </div>

      </div>

    </div>
</template>

<script>
    import dishmod from "@/components/dishmod.vue";

    export default {

        components: {
            dishmod
        },
        methods: {
            removeDish() {
                this.$store.commit('removeFromCart', this.data.id);
            },
            increment() {
                this.$store.commit('addEquentity', {"value": this.data});
            },
            decrement() {
                this.$store.commit('removeEquentity', {"value": this.data});
            },
            removeMod(modId) {
              console.log(this.data);
              this.$store.commit("removeModFromDish", {
                modId,
                id: this.data.id
              });
            },
        },
        created() {

        },
        data() {
            return {
                count: this.data.count
            }
        },

        props: ['data'],

        ready: function () {

        },
        mounted: function () {
        },
        computed: {
            getCartPrice: function () {
                return this.$store.getters.getCartSum;
            },
            getCount: function () {
                const dish = this.$store.state.cart.find(p => p.id === this.data.id);
                return dish.count;
            },

            getImage: function () {
              const imageUrl = `https://imgtest.burgerpizzoni.ru/_img/Rest/${
              this.data.fullData.Images[0].ImageName
              }`;

              return imageUrl;
            },
        }
    }
</script>

<style lang="scss" scoped>
.preview-cart-item {
  display: flex;
  flex-flow: row nowrap;
  position: relative;
  border-bottom: 1px solid lightgray;
  padding-bottom: 15px;

  &:nth-child(2n + 1) {
    margin-top: 15px;
  }

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
      transform: scale(1.15);
    }
  }


  .item-info {
    width: 100%;

    .item-controls {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      .item-title {
        font-size: 1.5rem;
        color: black;
        font-weight: bold;
      }

      .controls-counter {
        margin-left: auto;
        margin-right: 2.5rem;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        border: none;

        .ui-amount-control-value {
          width: 2rem;
          font-size: 1.25rem;
          text-align: center;
          line-height: 1;
        }

        button {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 5px;
          border: 1px solid black;
          border-radius: 100%;
          width: 1.25rem;
          height: 1.25rem;
          background-color: transparent;
          cursor: pointer;
          font-size: 1.25rem;
          line-height: 0;
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
          padding: 0 0.75rem;
          border: 1px solid black;
          border-radius: 50px;

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
        color: black;
        line-height: 1;
      }

      .item-weight {
        font-size: 0.9rem;
        color: gray;
        line-height: 1;
        margin-bottom: 0.1rem;
        margin-left: 2rem;
      }
    }
  }
}
</style>
