<template>
    <li v-if="type=='include'">
        <div class="mod-item">
            <span class="mod-name" v-text="data.ModName"></span>
            <span class="mod-price">+<span v-text="data.Price"></span>₽</span>
        </div>
        <div class="mod-actions">
            <button class="counter" @click.prevent="decModCount()">–</button>
            <span class="label-counter"><span
                    v-text="getCount"></span></span>
            <button class="counter" @click.prevent="addMod()">+</button>
        </div>
    </li>
    <div class="i-item" v-else-if="type=='exclude'">
        <span class="mod-name" v-text="data.FoodName" :class="{ 'mod-name-deleted': getCount }"></span>
        <span class="mod-delete-icon" v-if="!getCount" @click.prevent="addMod()"></span>
        <span class="mod-return-icon" v-if="getCount" @click.prevent="decModCount()"></span>
    </div>
    <li v-else-if="type=='all'">
        <button @click="removeMod()" class="mod-delete">x</button>
        <span v-text="data.name"></span> x<span
            v-text="data.count"></span>
        <span v-text="data.summ+' ₽'"></span>
        <button @click.prevent="addMod()">+</button>
        <button :class="{hide:(data.count<2)}" @click.prevent="decModCount()">-</button>
    </li>
</template>

<script>
  export default {
    name: 'dishModItem',
    methods: {
      addMod() {


        let modData = {
          id: this.modId,
          name: this.modName,
          price: this.data.Price
        };
        this.$store.commit("addModToDish", {modData: modData, id: this.dishId});
      },
      removeMod() {
        this.$store.commit("removeModFromDish", {
          modId: this.modId,
          id: this.dishId
        });
      },
      incModCount() {
        this.$store.commit("incModCount", {
          modId: this.modId,
          id: this.dishId
        });
      },
      decModCount() {
        this.$store.commit("decModCount", {
          modId: this.modId,
          id: this.dishId
        });
      }
    },
    created() {
    },
    data() {
      return {
        modId: this.data.id_Mod ? this.data.id_Mod : this.data.id_Food,
        modName: this.data.ModName ? this.data.ModName : this.data.FoodName
      }

    },

    props: ["data", "dishId", "type"],

    ready: function () {
    },
    mounted: function () {
      if (!this.data.id_Mod) {
        this.data.id_Mod = this.data.id;
      }
    },
    computed: {
      getCount: function () {
        let modCount = 0;

        const dish = this.$store.state.cart.find(p => p.id === this.dishId);

        if (dish) {
          const mod = dish.mods.find(p => p.id === this.modId);

          if (mod) {
            modCount = mod.count;
          }
        }
        return modCount;
      }
    }
  };
</script>
