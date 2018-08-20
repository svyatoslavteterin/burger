<template>
<div class="drink">
  <div class="pic" @click="showInfo">
    <img :src="getImage" alt="">
  </div> <!--pic-->
  <div class="chars">
    <div class="title">{{data.categName}}</div>

    <div class="bottom-row">
      <Dishes
        :dishes="this.data.dishes"
        v-if="this.data.dishes.length > 1"
        :activeDish="this.activeDish"
        v-on:setActiveDish="setActiveDish"
      />
      <div class="cart-price-wrap">
        <div class="price-wrapper">
          <span class="price" v-text="getPrice"></span>
          <span class="weight" v-text="`${getWeight} г`" v-if="showWeight == true"></span>
        </div>
        <div class="in-additional-order" @click="addToCart">Добавить</div>
      </div>
    </div>
    
  </div>
</div> <!--drink-->
</template>

<script>
import dishMods from "@/components/Dishmod";
import dishModItem from "@/components/Dishmod/item.vue";
import amountControls from "@/components/amountControls";
import Dishes from "@/components/Dishes";

export default {
  components: { dishMods, amountControls, Dishes, dishModItem },
  methods: {
    showInfo() {
      this.$modal.show("info", {
        data: this.data,
        activeDish: this.activeDish
      });
    },
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
    isActiveDish: function(index) {
      if (index == this.activeDish) {
        return true;
      }
    },
    addToCart: function () {
      let dishData = {
        id: this.data.dishes[this.activeDish].id,
        categName: this.data.categName,
        dishName: this.data.dishes[this.activeDish].dishName,
        dishShortName: this.data.dishes[this.activeDish].dishShortName,
        dishExtName: this.data.ExternalName,
        price: this.data.dishes[this.activeDish].Price,
        outPrice: this.data.dishes[this.activeDish].OutPrice,
        sellType: "COUNT",
        mods: [],
        excludes:[],
        idShop: 3,
        position: this.data.ShowOrder,
        fullData: this.data.dishes[this.activeDish].fullData,
        techCardData: this.data.dishes[this.activeDish].techCardData,
        fromDopSection: true // если добавлено из доп. разделов корзины
      };

      this.$store.commit("addToCart", {value: dishData});

      if (!Object.keys(this.$store.state.deliveryInfo).length > 0) {
        this.$modal.show("delivery");
      }
    },
    setActiveDish: function(index) {
      this.activeDish = index;
    }
  },
  created() {},
  data() {
    return {
      activeDish: 0,
      mods: {
        include: false,
        exclude: false
      }
    };
  },

  props: ["data", "type", "classKey", "showWeight"],

  ready: function() {},
  mounted: function() {
    console.log("--------", this.showWeight);
  },
  computed: {
    getClass: function() {
      return "mo " + this.classKey + "-mo";
    },
    showCounter: function() {
      return this.count > 0 ? true : false;
    },
    count: {
      get: function() {
        let count = 0;
        const dish = this.$store.state.cart.find(
          p => p.id === this.data.dishes[this.activeDish].id
        );
        if (dish) {
          count = dish.count;
        }
        return count;
      },
      addToCart: function() {
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

        this.$store.commit("addToCart", { value: dishData });
      },
      setActiveDish: function(index) {
        this.activeDish = index;
      }
    },
    dishData: function() {
      return this.data.dishes[this.activeDish];
    },
    getPrice: function() {
      let price = 0;
      if (typeof this.data.dishes[this.activeDish] != "undefined") {
        price = this.data.dishes[this.activeDish].Price.slice(0, -3);
      }
      return this.$currencyFormatter.format(price, {
        code: "RUB",
        precision: 0
      });
    },
    getWeight: function() {
      if (typeof this.data.dishes[this.activeDish] != "undefined") {
        return this.data.dishes[this.activeDish].fullData.ExitMass;
      }
    },
    getImage: function() {
      const imageUrl = `https://imgtest.burgerpizzoni.ru/_img/Rest/${
        this.data.dishes[this.activeDish].fullData.Images[0].ImageName
      }`;
      return imageUrl;
    }
  }
};
</script>