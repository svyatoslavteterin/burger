<template>
    <div class="items">
        <modal name="info" height="auto" adaptive v-cloak>
            <div class="modal-header">
                <button @click="$modal.hide('info')" class="info-modal-close"></button>
                <div class="info-yellow-block"></div>
                <div class="info-title">Куриная</div>
            </div>
            <div class="info-modal-pic">
                <img src="./img/modal-pic.png" alt="">
            </div>
            <div class="scrollbar-wrapper">
                <VuePerfectScrollbar class="modal-scrollbar" v-once :settings="settings">
                    <p>
                        <span>Состав:</span> оливковое масло, соль, перец, чеснок, помидоры
                    </p>
                    <p>
                        <span>Описание:</span> Lorem Ipsum - это текст-"рыба", часто используемый в печати и
                        вэб-дизайне.
                        Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время
                        некий
                        безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для
                        распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но
                        и
                        перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов
                        Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной
                        вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
                    </p>
                    <div class="empty-gap"></div>
                </VuePerfectScrollbar>

                <div class="fade-out-block"></div>
            </div>
        </modal>

        <foodItem v-for="food in data" :key="food.id" :data="food"></foodItem>

    </div> <!--items-->
</template>
<script>
    import VuePerfectScrollbar from "vue-perfect-scrollbar";
    import foodItem from "./item.vue";
    import "./style.scss";

    export default {
        components: {VuePerfectScrollbar, foodItem},
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
