<template>

    <section id="cart">
        <div class="container">
            <div class="page-nav"><a href="/"><i class="arrow-left"></i>Назад к меню</a></div>
            <div class="cart__top">
                <h2 class="pagetitle col-md-6">Корзина</h2>
                <div class="cart__info col-md-6 text-right">В вашей корзине 4 блюда.</div>
            </div>
            <div class="row">
                <div class="col-lg-6 col-xl-6 cart__item" v-for="data in this.items">
                    <cartitem :data="data"></cartitem>
                </div>

            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-xl-6">
                    <div class="row">
                        <div class="col">
                            <input type="text" name="address" v-model="query" placeholder="Введите адрес"
                                   @change="showAddresses"/>
                            <select name="street" v-model="street">
                                <option disabled value="">Выберите доступную улицу</option>
                                <option :value="street.street" v-for="street in this.addresses"
                                        v-text="street.street"></option>
                            </select>

                            <select name="house" v-if="street" v-model="house">
                                <option disabled value="">Выберите доступный дом</option>
                                <option :value="house.house" v-for="house in this.addresses[this.street].houses"
                                        v-text="house.house"></option>
                            </select>
                            <div class="checkout-address">
                                <div class="checkout-address__title">Адрес доставки</div>
                                <div class="checkout-address__value"><a href="#" class="actionlink">ул. Таганская,
                                    д.39стр6, подьезд 1, кв. 11 <i class="icon-arrow-down"></i></a></div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="checkout-payment">
                                <div class="checkout-payment__title">Способ оплаты</div>
                                <div class="checkout-payment__value"><a href="#" class="actionlink">Оплата курьеру
                                    наличными <i class="icon-arrow-down"></i></a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-xl-6">
                    <div class="row v-middle">
                        <div class="col text-right">
                            <div id="total-cart-price">{{getCartSum}}</div>
                        </div>
                        <div class="col">
                            <button class="checkout__submit btn" onclick="location.href='/live.html'">Оформить заказ
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </section>
</template>

<script>
    module.exports = {
        methods: {
            checkout() {

            },
            getAdresses: async function (query) {

                try {
                    let response = await this.$http.get('https://apitest.burgerpizzoni.ru/api/Address/get?street=' + this.query + '&access_token=' + store.state.authUser.id);
                    return response.data;
                } catch (e) {
                    this.errors.address.request = "Ошибка при получении адресов";

                }
            },
            showAddresses() {
                this.getAdresses(this.query).then((addresses) => {
                    if (typeof addresses != "undefined") {
                        this.addresses = addresses;
                    }
                });
            }
        },
        created() {

        },
        data() {
            return {
                houses: [],
                query: [],
                addresses: [],
                street: '',
                house: ''

            }
        },

        props: ['items'],

        ready: function () {

        },
        mounted: function () {

        },
        computed: {
            getCartSum: function () {
                let summ = 0;
                store.state.cart.forEach((item) => {
                    summ += item.price * item.count;
                });
                return summ + ' ₽';
            }
        }
    }
</script>
