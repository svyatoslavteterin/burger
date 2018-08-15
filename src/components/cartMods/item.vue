<template>
  <li v-if="type=='include'">
    <span class="name" v-text="data.name"></span>
    <div class="counter-block">
      <button class="counter" @click.prevent="decModCount()">-</button>
      <span class="label-counter" v-text="data.count"></span>
      <button class="counter" @click.prevent="incModCount()">+</button>
    </div>
    <span class="sum" v-text="+data.summ+' ₽'"></span>
    <span :class="{ 'mod-delete-icon': true, hide:(data.count < 2) }" @click.prevent="removeMod()"></span>
  </li>
</template>

<script>
export default {
  name: "cartModItem",
  methods: {
    addMod() {
      let modData = {
        id: this.modId,
        name: this.modName,
        price: this.data.Price,
        modType: this.modType
      };

      this.$store.commit("addModToDish", { modData: modData, id: this.dishId });
    },
    removeMod() {
      console.log("remove", this);
      this.$store.commit("removeModFromDish", {
        modId: this.modId,
        id: this.dishId,
        modType: this.modType
      });
    },
    incModCount() {
      console.log("inc", this);
      this.$store.commit("incModCount", {
        modId: this.modId,
        id: this.dishId
      });
    },
    decModCount() {
      console.log("dec", this);
      this.$store.commit("decModCount", {
        modId: this.modId,
        id: this.dishId
      });
    }
  },
  created() {},
  data() {
    return {
      modId: this.data.id,
      modName: this.data.ModName ? this.data.ModName : this.data.FoodName,
      modType: this.data.id ? "mods" : "excludes"
    };
  },

  props: ["data", "dishId", "type"],

  ready: function() {},
  mounted: function() {
    if (!this.data.id_Mod) {
      this.data.id_Mod = this.data.id;
    }
  },
  computed: {
    getCount: function() {
      let modCount = 0;

      const dish = this.$store.state.cart.find(p => p.id === this.dishId);

      if (dish) {
        const mod = dish[this.modType].find(p => p.id === this.modId);

        if (mod) {
          modCount = mod.count;
        }
      }
      return modCount;
    }
  }
};
</script>
