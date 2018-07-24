<template>
    <li v-if="type=='include'">
        <span v-text="data.ModName"></span> x<span
            v-text="getCount"></span>
        <button @click.prevent="addMod()">+</button>
        <button :class="{hide:!getCount}" @click.prevent="decModCount()">-</button>
    </li>
    <li v-else-if="type=='exclude'">
        <span v-text="data.ModName"></span>
        <button :class="{hide:getCount}" @click.prevent="addMod()">+</button>
        <button :class="{hide:!getCount}" @click.prevent="decModCount()">-</button>
    </li>
    <li v-else-if="type=='all'">
        <button @click="removeMod()" class="mod-delete">x</button>
        <span v-text="data.name"></span> x<span
            v-text="data.count"></span>
        <span v-text="data.summ+' ₽'"></span>
        <button  @click.prevent="addMod()">+</button>
        <button :class="{hide:(data.count<2)}" @click.prevent="decModCount()">-</button>
    </li>
</template>

<script>
    export default {
        methods: {
            addMod() {

                let modData = {
                    id: this.data.id_Mod,
                    name: this.data.ModName,
                    price: this.data.Price
                }
                this.$store.commit('addModToDish', {'modData': modData, 'id': this.dishId});
            },
            removeMod() {

                this.$store.commit('removeModFromDish', {'modId': this.data.id_Mod, 'id': this.dishId});
            },
            incModCount() {
                this.$store.commit('incModCount', {'modId': this.data.id_Mod, 'id': this.dishId});
            },
            decModCount() {
                this.$store.commit('decModCount', {'modId': this.data.id_Mod, 'id': this.dishId});
            },
        },
        created() {

        },
        data() {
            return {
            }
        },

        props: ['data', 'dishId', 'type'],

        ready: function () {

        },
        mounted: function () {
            if (!this.data.id_Mod){
                this.data.id_Mod=this.data.id;
            }
        },
        computed: {

            getCount: function () {
                let modCount = 0;

                const dish = this.$store.state.cart.find(p => p.id === this.dishId);

                if (dish) {

                    const mod = dish.mods.find(p => p.id === this.data.id_Mod);

                    if (mod) {
                        modCount = mod.count;
                    }
                }
                return modCount;
            },
        }
    }
</script>
