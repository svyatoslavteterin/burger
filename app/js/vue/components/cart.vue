<template>

    <section id="cart">
        <div class="container">
            <div class="page-nav"><a href="/"><i class="arrow-left"></i>Назад к меню</a></div>
            <div class="cart__top">
                <h2 class="pagetitle col-md-6">Корзина</h2>
                <div class="cart__info col-md-6 text-right">В вашей корзине <span v-text="getCartCount"></span> блюда.
                </div>
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

                            <div class="checkout-address">
                                <div class="checkout-address__title">Адрес доставки</div>
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
                            </div>
                        </div>
                        <div class="col">
                            <div class="checkout-payment">
                                <div class="checkout-payment__title">Способ оплаты</div>
                                <select name="payment" v-model="payment">
                                    <option :value="payment.type" v-for="payment in this.payments"
                                            v-text="payment.title"></option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-xl-6">
                    <div class="row v-middle">
                        <div class="col text-right">
                            <div id="total-cart-price" v-text="getCartSum"></div>
                        </div>
                        <div class="col">
                            <button class="checkout__submit btn" @click.prevent="checkout">Оформить заказ
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
            sendOrder: async function (order) {
                try {
                    let response = await this.$http.post('https://apitest.burgerpizzoni.ru/api/Orders/newOrder?access_token=' + store.state.authUser.id, order);
                    return response.data;
                } catch (e) {
                    this.errors.checkout.request = "Ошибка при чекауте";

                }
            },
            checkout() {
                let dishes = [];
                let cartSum = 0;
                store.state.cart.forEach((item) => {
                    item.summ = item.count * item.price;
                    dishes.push(item);
                    cartSum += item.price * item.count;
                });

                let user = {
                    "Username": store.state.authUser.userInfo.username,
                    "id_Mongo": store.state.authUser.id,
                    "Bonus": store.state.authUser.userInfo.Bonus,
                    "id": store.state.authUser.userId,
                    "FirstName": store.state.authUser.userInfo.FirstName,
                    "Phone": store.state.authUser.userInfo.Phone,
                    "LastName": store.state.authUser.userInfo.Lastname,
                    "MiddleName": store.state.authUser.userInfo.MiddleName,
                    "Mail": store.state.authUser.userInfo.Mail,
                    "PersonalPercentBonus": store.state.authUser.userInfo.PersonalPercentBonus,
                    "id_Cause": 0
                };

                let order = {
                    "dishes": dishes,
                    "summ": cartSum,
                    "user": user,
                    "customerName": user.FirstName,
                    "status": "checked",
                    "address": {
                        "Street": this.street,
                        "House": this.house,
                        "Housing": "2",
                        "Structure": "3",
                        "Office": "4",
                        "Entrance": "5",
                        "DoorphoneСode": "6",
                        "Floor": "7",
                        "Apartment": "8",
                        "needOddFrom": "",
                        "Comments": "Комментарий к заказу"
                    },
                    "bonusByOrder": 97,
                    "paymentInfo": {
                        "payment": {
                            "summ": cartSum,
                            "orderSumm": cartSum,
                            "bonusSumm": 0,
                            "odd": 0,
                            "type": this.payment.type,
                            "hybrid": {
                                "step": 0,
                                "cash": 0,
                                "card": {
                                    "type": "",
                                    "summ": 0
                                }
                            }
                        }
                    }
                };
                this.sendOrder(order).then((data) => {
                    console.log(data);
                });
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
                house: '',
                payment: 'CASH-DELIVERY',
                payments: [
                    {title: "Оплата курьеру наличными", type: "CASH-DELIVERY"}
                ]

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
                    let itemPrice = +item.price;
                    if (item.mods.length > 0) {
                        item.mods.forEach((mod) => {
                            itemPrice += +mod.summ;
                        });
                    }
                    summ += itemPrice * item.count;
                });
                return summ + ' ₽';
            },
            getCartCount: function () {
                let count = 0;
                store.state.cart.forEach((item) => {
                    count += item.count;
                });
                return count;
            }
        }
    }
</script>
