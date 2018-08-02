<template>
    <div class="items">
      <foodItem v-for="food in foods" :key="food.id" :data="food"></foodItem>
    </div> <!--items-->
</template>
<script>
import foodItem from "./item.vue";
import "./style.scss";

export default {
  components: { foodItem },
  data() {
    return {
      settings: {
        maxScrollbarLength: 60
      },
      activeDish: 0,
      mods: {
        include: false,
        exclude: false
      }
    };
  },
  props: ["foods"],
  methods: {
    isActiveDish: function(index) {
      if (index == this.activeDish) {
        return true;
      }
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
      alert("Добавлено");
    },
    setActiveDish: function(index) {
      this.activeDish = index;
    }
  },
  computed: {
    dishData: function() {
      return this.data.dishes[this.activeDish];
    },
    getPrice: function() {
      let price = 0;
      if (typeof this.data.dishes[this.activeDish] != "undefined") {
        price = this.data.dishes[this.activeDish].Price.slice(0, -3);
      }
      return price;
    },
    getWeight: function() {
      if (typeof this.data.dishes[this.activeDish] != "undefined") {
        return this.data.dishes[this.activeDish].fullData.ExitMass;
      }
    },
    getModWidth: function() {
      return 100 / this.data.dishes.length;
    }
  }
};
</script>
