<template>
    <div class="col-lg-6 col-xl-6 cart__item">
        <div class="cart__item__wrapper">
            <a href="#" class="cart__item__remove" @click.prevent="removeDish"></a>
            <div class="row">
                <div class="col-xs-3 col-md-3 cart__item__img">
                    <img :src="getImage" alt="food" class="img-fluid"/>
                </div>
                <div class="col-xs-9 col-md-9">
                    <div class="cart__item__title">{{data.dishExtName}}</div>
                    <div class="cart__item__info">
                        <div class="param">
                            <div class="param__title">Вес:</div>
                            <div class="param__value">{{data.fullData.ExitMass}} г.</div>
                        </div>
                        <div class="param">
                            <div class="param__title">Размер:</div>
                            <div class="param__value">{{data.dishName}}</div>
                        </div>
                        <div class="param__title">Дополнительно:</div>
                        <ul class="cart-mods">
                            <dishmod v-for="(mod,index) in data.mods" :data="mod" :type="'all'"
                                     :dishId="data.id" :key="index"></dishmod>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="cart__item__bottom">
                <div class="cart__item__price">{{data.price}} ₽</div>
                <div class="ui-amount-control vertical">
                    <button class="" @click.prevent="decrement"><i class="icon-minus"></i></button>
                    <span class="ui-amount-control__value" v-text="getCount"></span>
                    <button class="plus-one-btn" @click.prevent="increment"><i class="icon-plus"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import imageUrl from "@/assets/images/200x200.png";
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
            }
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
            getPrice: function () {
                return this.data.price.slice(0, -3);
            },
            getCount: function () {
                const dish = this.$store.state.cart.find(p => p.id === this.data.id);
                return dish.count;
            },

            getImage: function () {

                //  }else{
                // imageUrl='http://api.burger.jmedia.pro/public/images/'+this.data.id+'/430-275/'+this.data.ImageName;
                //  }
                return imageUrl;
            },
        }
    }
</script>
