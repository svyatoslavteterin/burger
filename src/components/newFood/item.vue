<template>
    <div class="food">
        <div class="chars">
            <div class="title">{{data.categName}}</div>
            {{data.categDescr}}

            <a class="i-add" @click.prevent="mods.include = !mods.include">добавить</a>
            <a class="i-more">развернуть</a>

            <dishMods></dishMods>
            <modGroups></modGroups>
            <div class="bottom">
                <div class="price"><span v-text="getPrice"></span><span>₽</span></div>
                <div class="weight"><span v-text="getWeight"></span> г.</div>
                <button class="in-basket" v-show="!showCounter" @click="showCounter = !showCounter">В корзину</button>
                <div v-show="showCounter" class="counter-block">
                    <amountControls></amountControls>
                </div>
            </div>
        </div><!--chars-->
        <div class="pic" @click="$modal.show('info')">
            <img src="./img/pizzoni_parts_03.jpg" alt="">
            <div class="arrow"></div>
            <div class="detail">
                <div class="detail-img"></div>
                <div class="detail-text">подробнее</div>
            </div>
        </div> <!--pic-->
    </div> <!--food-->
</template>

<script>
    import dishMods from "@/components/newDishmod";
    import dishModItem from "@/components/newDishmod/item.vue";
    import amountControls from "@/components/amountControls";
    import modGroups from "@/components/modGroups";

    export default {
        components: {dishMods, dishModItem, amountControls, modGroups},
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

                // if (this.data.ImageName.indexOf('empty')>0){

                //  }else{
                // imageUrl='http://api.burger.jmedia.pro/public/images/'+this.data.id+'/430-275/'+this.data.ImageName;
                //  }
                return imageUrl;
            },
            getModWidth: function () {

                return 100 / this.data.dishes.length;
            }
        }
    }
</script>