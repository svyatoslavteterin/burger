<template>
<div>
  <li class="cart-item">
    <div class="main-info">
      <div class="pic">
        <img :src="getImage" alt="">
      </div><!--pic-->
      <div class="chars">
        <div class="top">
          <div class="title">{{data.categName}} <span class="size">|&nbsp;{{data.dishName}}</span></div>
          <div class="ingrids">
            <dishMods
              :mods="data.techCardData"
              :dishId="data.id"
              :type="'exclude'"
            />
          </div>
        </div>
        <div class="bottom">
          <div class="bottom-row">
            <div class="price"><span v-text="getPrice"></span></div>
            <div class="weight"><span v-text="getWeight"></span> г</div>
            <amountControls
              v-show="showCounter"
              :count="count"
              :showCounter="showCounter"
              v-on:decrement="decrement"
              v-on:increment="increment"
            />
          </div>
        </div>
      </div><!--chars-->
    </div>
    <div class="additional-with-order">
      <div class="close" @click="removeDish"></div>
      <span class="mods-title">Добавлено к заказу</span>
      <cartMods
        :mods="data.mods"
        :dishId="data.id"
        :type="'include'"
      />
      <a v-if="haveMods" class="i-add" @click.prevent="mods.include = !mods.include">добавить</a>
      <div class="include-mods">
        <dishMods
          v-if="mods.include"
          :mods="data.fullData.ModGroups[1].mods"
          :dishId="data.id"
           v-on:hide="mods.include = !mods.include"
          :type="'include'"
        />
      </div>
      <div class="dish-sum">Стоимость блюда: <span>{{getDishSum}} ₽</span></div>
    </div>
  </li>
</div>
</template>
<script>
import dishMods from "@/components/Dishmod";
import cartMods from "@/components/cartMods";
import dishModItem from "@/components/Dishmod/item.vue";
import amountControls from "@/components/amountControls";
export default {
  name: "CartList",
  components: { cartMods, dishMods, dishModItem, amountControls },
  props: ["data", "type", "dopItems"],
  data() {
    return {
      activeDish: 0,
      mods: {
        include: false,
        exclude: false
      }
    };
  },
  methods: {
    removeDish() {
      this.$store.commit("removeFromCart", this.data.id);
    },
    increment() {
      this.$store.commit("addEquentity", {
        value: this.data
      });
    },
    decrement() {
      this.$store.commit("removeEquentity", {
        value: this.data
      });
    },
    isActiveDish: function(index) {
      if (index == this.activeDish) {
        return true;
      }
    },
    addToCart: function() {
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
        excludes: [],
        idShop: 3,
        position: this.data.ShowOrder,
        fullData: this.data.dishes[this.activeDish].fullData,
        techCardData: this.data.dishes[this.activeDish].techCardData
      };

      this.$store.commit("addToCart", { value: dishData });

      if (!Object.keys(this.$store.state.deliveryInfo).length > 0) {
        this.$modal.show("delivery");
      }
    },
    setActiveDish: function(index) {
      this.activeDish = index;
    }
  },
  created() {},
  ready: function() {},
  mounted: function() {},
  computed: {
    haveMods() {
      // если есть группы с модификаторами, то показываем кнопку добавить (модификаторы)
      return this.data.fullData.ModGroups.length > 0 ? true : false;
    },
    getClass: function() {
      return "mo " + this.classKey + "-mo";
    },
    showCounter: function() {
      return this.count > 0 ? true : false;
    },
    count: {
      get: function() {
        let count = 0;
        const dish = this.$store.state.cart.find(p => p.id === this.data.id);
        if (dish) {
          count = dish.count;
        }
        return count;
      },
      addToCart: function() {
        let dishData = {
          id: this.data.id,
          dishName: this.data.dishName,
          dishShortName: this.data.dishShortName,
          dishExtName: this.data.ExternalName,
          price: this.data.Price,
          outPrice: this.data.OutPrice,
          sellType: "COUNT",
          mods: [],
          idShop: 3,
          position: this.data.ShowOrder,
          fullData: this.data.fullData
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
      console.log("data:", this.data);
      let price = 0;
      if (typeof this.data != "undefined") {
        price = this.data.fullData.Price.slice(0, -3);
      }
      return this.$currencyFormatter.format(price, {
        code: "RUB",
        precision: 0
      });
    },
    getWeight: function() {
      if (typeof this.data != "undefined") {
        return this.data.fullData.ExitMass;
      }
    },
    getImage: function() {
      console.log(this.data.fullData.Images[0].ImageName);
      const imageUrl = `https://imgtest.burgerpizzoni.ru/_img/Rest/${
        this.data.fullData.Images[0].ImageName
      }`;
      return imageUrl;
    },
    getDishSum: function() {
      console.log("0000000000000000000000000", this.data);
      let dishSum = 0;
      const dishItem = Number(this.data.count) * parseFloat(this.data.price);
      let dishMods = 0;
      for (let i = 0; i < this.data.mods.length; i += 1) {
        let count = this.data.mods[i].count;
        let price = this.data.mods[i].price;
        dishMods += Number(count) * parseFloat(price);
      }
      dishSum = dishItem + dishMods;
      return dishSum;
    }
  }
};
</script>

