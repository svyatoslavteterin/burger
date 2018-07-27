<template>

    <div class="food">
        <div class="chars">
            <div class="title">{{data.categName}}</div>
            <div class="ingrids">
                <div class="i-item">
                    <span class="mod-name">мясо</span>
                    <span class="mod-delete-icon"></span>
                </div>
                <div class="i-item">
                    <span class="mod-name mod-name-deleted">лук</span>
                    <span class="mod-return-icon"></span>
                </div>
                <div class="i-item">
                    <span class="mod-name mod-name-deleted">помидоры</span>
                    <span class="mod-return-icon"></span>
                </div>
                <div class="i-item">
                    <span class="mod-name mod-name-deleted">помидоры</span>
                    <span class="mod-return-icon"></span>
                </div>
                <div class="i-item">
                    <span class="mod-name mod-name-deleted">помидоры</span>
                    <span class="mod-return-icon"></span>
                </div>
                <div class="i-item">
                    <span class="mod-name mod-name-deleted">помидоры</span>
                    <span class="mod-return-icon"></span>
                </div>
                <div class="i-item">
                    <span class="mod-name mod-name-deleted">помидоры</span>
                    <span class="mod-return-icon"></span>
                </div>
                <div class="i-item">
                    <span class="mod-name mod-name-deleted">перец</span>
                    <span class="mod-return-icon"></span>
                </div>

            </div>
            <a class="i-add" @click.prevent="mods.include = !mods.include">добавить</a>
            <a class="i-more">развернуть</a>
            <div class="include-mods">
                <newDishmod v-if="mods.include" :data="data"></newDishmod>
            </div>
            <div class="sizes">
                <div class="btn" :class="{ active: isActiveDish(index) }"  v-for="(dish,index) in data.dishes" :key="index" @click.prevent="setActiveDish(index)">{{dish.dishName}}</div>
            </div>
            <div class="bottom">
                <div class="price"><span v-text="getPrice"></span><span>₽</span></div>
                <div class="weight"> <span v-text="getWeight"></span> г.</div>
                <button class="in-basket" v-show="!showCounter" @click="showCounter = !showCounter">В корзину</button>
                <div v-show="showCounter" class="counter-block">
                    <button class="counter">−</button>
                    <span class="label-counter">1</span>
                    <button class="counter">+</button>
                </div>
            </div>
        </div><!--chars-->
        <div class="pic" @click="$modal.show('info')">
            <img src="./img/pizzoni_parts_01.jpg" alt="">
            <div class="arrow"></div>
            <div class="detail">
                <div class="detail-img"></div>
                <div class="detail-text">подробнее</div>
            </div>
        </div> <!--pic-->
    </div> <!--food-->
</template>
<script>
    import VuePerfectScrollbar from "vue-perfect-scrollbar";
    import dishmod from "@/components/dishmod.vue";
    import newDishmod from "@/components/newDishmod";
    import "./style.scss";

    export default {
        components: {VuePerfectScrollbar, dishmod, newDishmod},
        data() {
            return {
                showCounter: false,
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
        props: ["data"],
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

                this.$store.commit("addToCart", {value: dishData});
                alert("Добавлено");
            },
            setActiveDish: function (index) {
                this.activeDish = index;
            }
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
            getModWidth: function () {
                return 100 / this.data.dishes.length;
            }
        }
    };
</script>
