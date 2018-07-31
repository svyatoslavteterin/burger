<template>

    <div class="food__item__wrapper">
        <div class="food__item__img"><img :src="getImage" class="img-fluid"/></div>
        <h2 class="food__item__title">{{data.categName}}</h2>
        <div class="food__item__ingredients">{{data.categDescr}}
        </div>
        <div class="ui-control-foodsize">
            <ul>
                <li :style="{ width: getModWidth+'%'}" :class="{ active: isActiveDish(index) }"
                    v-for="(dish,index) in data.dishes" :key="index">
                    <a href="" @click.prevent="setActiveDish(index)">{{dish.dishName}}</a>
                </li>
            </ul>
        </div>
        <div class="ui-controls-ingred row">
            <div class="col-sm-6  col-12" v-if="data.dishes[this.activeDish].ModGroups[1]">
                <a href="#" class="add-to-dish btn" @click.prevent="mods.include=!mods.include">
                    <i class="icon-plus-circled"></i>Добавить
                    в
                    блюдо</a>
                <div class="include-mods">
                    <ul :class="{active:mods.include}">
                        <dishmod :key="mod.id_Mod" :data="mod" :dishId="dishData.id" :type="'include'"
                                 v-for="(mod) in data.dishes[this.activeDish].ModGroups[1].mods"></dishmod>
                    </ul>
                </div>

            </div>

            <div class="col-sm-6 col-12 " v-if="data.dishes[this.activeDish].ModGroups[2]">
                <a href="#" class="remove-from-dish btn" @click.prevent="mods.exclude=!mods.exclude">
                    <i class="icon-minus-circled"></i>Убрать
                    из
                    блюда</a>
                <div class="exclude-mods">
                    <ul :class="{active:mods.exclude}">
                        <dishmod :key="mod.id_Mod" :data="mod" :dishId="dishData.id" :type="'exclude'"
                                 v-for="(mod) in data.dishes[this.activeDish].ModGroups[2].mods"></dishmod>
                    </ul>
                </div>
            </div>

        </div>
        <div class="food__item__bottom">
            <div class="row v-middle">
                <div class="col-lg-4 col-xl-4 col-md-4 col-4 food__item__price">
                    <span v-text="getPrice"></span> ₽
                </div>
                <div class="col-lg-3 col-xl-3  col-md-4 col-8 food__item__weight">
                    <span v-text="getWeight"></span> г
                </div>
                <div class="col-lg-5 col-xl-5 padding0 col-md-4 ">
                    <button class="food__item__btn btn btn-add-to-cart" @click.prevent="addToCart">В корзину</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import dishmod from '@/components/dishmod.vue';
    import imageUrl from "@/assets/images/200x200.png";

    export default {
        components: {
            dishmod
        },
        methods: {


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

                this.$store.commit('addToCart', {'value': dishData});
                alert('Добавлено');
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
            }
        },

        props: ['data'],

        ready: function () {

        },
        mounted: function () {

        },
        computed: {
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

                imageUrl=``;
                return imageUrl;
            },
            getModWidth: function () {

                return 100 / this.data.dishes.length;
            }
        }
    }
</script>
