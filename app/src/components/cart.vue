<template>

    <section id="cart">
        <div class="container">
            <div class="page-nav"> <router-link to="/"> <a><i class="arrow-left"></i>Назад к меню</a></router-link></div>
            <div class="cart__top">
                <h2 class="pagetitle col-md-6">Корзина</h2>
                <div class="cart__info col-md-6 text-right">В вашей корзине <span v-text="getCartCount"></span> блюда.
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 col-xl-6 cart__item" v-for="(data,index) in this.items" :key="index">
                    <cartitem :data="data"></cartitem>
                </div>

            </div>
        </div>
        <div class="container" v-if="getCartCount">
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
                                    <option :value="street.street" v-for="(street,index) in this.addresses"
                                            v-text="street.street" :key="index"></option>
                                </select>

                                <select name="house" v-if="street" v-model="house">
                                    <option disabled value="">Выберите доступный дом</option>
                                    <option :value="house.house" v-for="(house,index) in this.addresses[this.street].houses"
                                            v-text="house.house" :key="index"></option>
                                </select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="checkout-payment">
                                <div class="checkout-payment__title">Способ оплаты</div>
                                <select name="payment" v-model="payment">
                                    <option :value="payment.Name" v-for="(payment,index) in this.payments"
                                            v-text="payment.Descr" :key="index"></option>
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
    import cartitem from "@/components/cartitem.vue";

    export default {
        components: { cartitem},
        methods: {
            clear: function () {
                this.$store.commit('clearCart');
            },
            getPaymentTypes: async function () {
                try {
                    let response = await this.$http.get('https://apitest.burgerpizzoni.ru/api/Agents/getPayTypes');
                    return response.data;
                } catch (e) {
                    this.errors.payment.request = "Ошибка при получении вариантов оплат";

                }
            },
            sendOrder: async function (order) {
                try {
                    let response = await this.$http.post('https://apitest.burgerpizzoni.ru/api/Orders/newOrder?access_token=' + this.$store.state.authUser.id, order);
                    return response.data;
                } catch (e) {
                    this.errors.checkout.request = "Ошибка при чекауте";

                }
            },
            checkout() {
                let dishes = [];
                let cartSum = 0;
                this.$store.state.cart.forEach((item) => {
                    let itemPrice = +item.price;
                    if (item.mods.length > 0) {
                        item.mods.forEach((mod) => {
                            itemPrice += +mod.summ;
                        });
                    }
                    cartSum += itemPrice * item.count;
                });

                let user = {
                    "Username": this.$store.state.authUser.userInfo.username,
                    "id_Mongo": this.$store.state.authUser.id,
                    "Bonus": this.$store.state.authUser.userInfo.Bonus,
                    "id": this.$store.state.authUser.userId,
                    "FirstName": this.$store.state.authUser.userInfo.FirstName,
                    "Phone": this.$store.state.authUser.userInfo.Phone,
                    "LastName": this.$store.state.authUser.userInfo.Lastname,
                    "MiddleName": this.$store.state.authUser.userInfo.MiddleName,
                    "Mail": this.$store.state.authUser.userInfo.Mail,
                    "PersonalPercentBonus": this.$store.state.authUser.userInfo.PersonalPercentBonus,
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
                            "type": this.payment,
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
                this.sendOrder(order).then((response) => {
                    let orderId = response;

                    if (this.payment == "CARD") {
                        const proxyurl = "https://cors-anywhere.herokuapp.com/";
                        this.$http.get(proxyurl + 'https://3dsec.sberbank.ru/payment/rest/register.do?amount=' + (cartSum * 100) + '&currency=643&language=ru&orderNumber=' + orderId + '&userName=burgerpizzoni-api&password=burgerpizzoni&pageView=DESKTOP&merchantLogin=burgerpizzoni&returnUrl=https://apitest.burgerpizzoni.ru/api/Acquirings/paymentSuccess').then((res) => {
                            this.clear();
                            window.location.href = res.data.formUrl;
                        });
                    }

                });
            },
            getAdresses: async function () {

                try {
                    let response = await this.$http.get('https://apitest.burgerpizzoni.ru/api/Address/get?street=' + this.query + '&access_token=' + this.$store.state.authUser.id);
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
                payment: 'CARD',
                payments: []

            }
        },

        props: ['items'],

        ready: function () {

        },
        mounted: function () {
            this.getPaymentTypes().then((payments) => {
                if (typeof payments != "undefined") {
                    this.payments = payments;
                }
            });
        },
        computed: {
            getCartSum: function () {
                let summ = 0;
                if (this.$store.state.cart.length > 0) {
                    this.$store.state.cart.forEach((item) => {
                        let itemPrice = +item.price;
                        if (item.mods.length > 0) {
                            item.mods.forEach((mod) => {
                                itemPrice += +mod.summ;
                            });
                        }
                        summ += itemPrice * item.count;
                    });
                }
                return summ + ' ₽';
            },
            getCartCount: function () {
                let count = 0;
                if (this.$store.state.cart.length > 0) {
                    this.$store.state.cart.forEach((item) => {
                        count += item.count;
                    });
                }
                return count;
            }
        }
    }
</script>
