<template>
    <div :class="getClass" v-if="type==='offer'">
        <div class="add-mo-to-cart">
            <div class="mo-to-cart-img"></div>
            <div class="mo-to-cart-text" v-show="!showCounter" @click="showCounter = !showCounter">Заказать</div>
            <amountControls v-show="showCounter" :count="count" :showCounter="showCounter"
                            v-on:decrement="decrement" v-on:increment="increment"></amountControls>
        </div>
        <div class="chars">
            <div class="title">{{data.categName}}</div>
            <div class="ingrids" v-if="data.dishes[this.activeDish].techCardData">
                <dishMods :mods="data.dishes[this.activeDish].techCardData"
                          :dishId="data.dishes[this.activeDish].id" :type="'exclude'"></dishMods>
            </div>
            <a class="i-add" @click.prevent="mods.include = !mods.include">добавить</a>
            <a class="i-more">развернуть</a>
            <div class="include-mods">

                <dishMods v-if="mods.include" :mods="data.dishes[this.activeDish].ModGroups[1].mods"
                          :dishId="data.dishes[this.activeDish].id"></dishMods>
            </div>
            <Dishes :dishes="this.data.dishes" v-if="this.data.dishes.length>1" :activeDish="this.activeDish"
                    v-on:setActiveDish="setActiveDish"></Dishes>
            <div class="bottom">
                <div class="price"><span v-text="getPrice"></span><span>₽</span></div>
                <div class="weight"><span v-text="getWeight"></span> г.</div>
                <button class="in-basket" v-show="!showCounter" @click="addToCart">В корзину
                </button>
                <amountControls v-show="showCounter" :count="count" :showCounter="showCounter"
                                v-on:decrement="decrement" v-on:increment="increment"></amountControls>
            </div>
        </div><!--chars-->
    </div>
    <div class="food" v-else>
        <div class="chars">
            <div class="top">
                <div class="title">{{data.categName}}</div>
                <div class="ingrids" v-if="data.dishes[this.activeDish].techCardData">
                    <dishMods :mods="data.dishes[this.activeDish].techCardData"
                              :dishId="data.dishes[this.activeDish].id" :type="'exclude'"></dishMods>
                </div>
                <a class="i-add" @click.prevent="mods.include = !mods.include"
                   v-if="data.dishes[this.activeDish].ModGroups[1]">добавить</a>
                <a class="i-more"
                   v-if="data.dishes[this.activeDish].ModGroups[3]">развернуть</a>
                <div class="include-mods">
                    <dishMods v-if="mods.include" :mods="data.dishes[this.activeDish].ModGroups[1].mods"
                              :dishId="data.dishes[this.activeDish].id" :type="'include'"></dishMods>
                </div>
                <Dishes :dishes="this.data.dishes" v-if="this.data.dishes.length>1" :activeDish="this.activeDish"
                        v-on:setActiveDish="setActiveDish"></Dishes>
            </div>
            <div class="bottom">
                <div class="price"><span v-text="getPrice"></span><span>₽</span></div>
                <div class="weight"><span v-text="getWeight"></span> г.</div>
                <button class="in-basket" v-show="!showCounter" @click="addToCart">В корзину</button>

                <amountControls v-show="showCounter" :count="count" :showCounter="showCounter"
                                v-on:decrement="decrement" v-on:increment="increment"></amountControls>
            </div>
        </div><!--chars-->
        <div class="pic" @click="$modal.show('info')">
            <div class="detail">
                <div class="arrow"></div>
                <div class="detail-img"></div>
                <div class="detail-text">подробнее</div>
            </div>
            <img :src="getImage" alt="">
        </div> <!--pic-->
    </div> <!--food-->
</template>

<script>
  import dishMods from "@/components/newDishmod";
  import dishModItem from "@/components/newDishmod/item.vue";
  import amountControls from "@/components/amountControls";
  import Dishes from "@/components/Dishes";

  export default {
    components: {dishMods, amountControls, Dishes, dishModItem},
    methods: {
      increment() {
        this.$store.commit("addEquentity", {
          value: this.data.dishes[this.activeDish]
        });
      },
      decrement() {
        this.$store.commit("removeEquentity", {
          value: this.data.dishes[this.activeDish]
        });
      },
      isActiveDish: function (index) {
        if (index == this.activeDish) {
          return true;
        }
      },
      addToCart: function () {
        let dishData = {
          id: this.data.dishes[this.activeDish].id,
          dishName: this.data.dishes[this.activeDish].dishName,
          dishShortName: this.data.dishes[this.activeDish].dishShortName,
          dishExtName: this.data.ExternalName,
          price: this.data.dishes[this.activeDish].Price,
          outPrice: this.data.dishes[this.activeDish].OutPrice,
          sellType: "COUNT",
          mods: [],
          idShop: 3,
          position: this.data.ShowOrder,
          fullData: this.data.dishes[this.activeDish].fullData
        };

        this.$store.commit("addToCart", {value: dishData});
      },
      setActiveDish: function (index) {
        this.activeDish = index;
      }
    },
    created() {
    },
    data() {
      return {
        activeDish: 0,
        mods: {
          include: false,
          exclude: false
        }
      };
    },

    props: ["data", "type", "classKey"],

    ready: function () {
    },
    mounted: function () {
    },
    computed: {
      getClass: function () {
        return 'mo ' + this.classKey + '-mo';
      },
      showCounter: function () {
        return this.count > 0 ? true : false;
      },
      count: {
        get: function () {
          let count = 0;
          const dish = this.$store.state.cart.find(
            p => p.id === this.data.dishes[this.activeDish].id
          );
          if (dish) {
            count = dish.count;
          }
          return count;
        },
        addToCart: function () {
          let dishData = {
            id: this.data.dishes[this.activeDish].id,
            dishName: this.data.dishes[this.activeDish].dishName,
            dishShortName: this.data.dishes[this.activeDish].dishShortName,
            dishExtName: this.data.ExternalName,
            price: this.data.dishes[this.activeDish].Price,
            outPrice: this.data.dishes[this.activeDish].OutPrice,
            sellType: "COUNT",
            mods: [],
            idShop: 3,
            position: this.data.ShowOrder,
            fullData: this.data.dishes[this.activeDish].fullData
          };

          this.$store.commit("addToCart", {value: dishData});
        },
        setActiveDish: function (index) {
          this.activeDish = index;
        }
      },
      dishData: function () {
        return this.data.dishes[this.activeDish];
      },
      getPrice: function () {
        let price = 0;
        if (typeof this.data.dishes[this.activeDish] != "undefined") {
          price = this.data.dishes[this.activeDish].Price.slice(0, -3);
        }
        return price;
      },
      getWeight: function () {
        if (typeof this.data.dishes[this.activeDish] != "undefined") {
          return this.data.dishes[this.activeDish].fullData.ExitMass;
        }
      },
      getImage: function () {
        const imageUrl = `https://imgtest.burgerpizzoni.ru/_img/Rest/${
          this.data.dishes[this.activeDish].fullData.Images[0].ImageName
          }`;

        console.log(imageUrl);
        return imageUrl;
      },
    }
  };
</script>