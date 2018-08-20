<template>
    <div>
        <section id="mainnavbar">
            <div class="container">
                <div class="row v-middle">
                    <div class="col-lg-1 col-xl-1 logo">
                        <img src="@/assets/images/logo.svg" alt="logo" class="img-fluid"/>
                    </div>
                    <div class="col-lg-3 col-xl-3    ">
                        <filters :filters="tags"></filters>

                        <search></search>

                    </div>
                    <div class="col-lg-8 col-xl-8  ">
                        <MainMenu :data="menu"></MainMenu>
                    </div>
                </div>

            </div>
        </section>
        <section id="main">
            <div class="container food">
                <div class="row">

                    <div v-if="status==1">Оплата прошла успешно. Ваш заказ № {{orderid}}</div>
                    <div v-else>Возникла ошибка при оплате.
                        <router-link to="/cart"><a href="/cart">Повторите
                            попытку или оплатите наличными</a></router-link>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    // @ is an alias to /src
    import MainMenu from "@/components/MainMenu";
    import filters from "@/components/Filter";
    import search from "@/components/Search";

    export default {
        name: "PaymentPage",
        components: {
            MainMenu,
            filters,
            search,
        },
        data() {
            return {
                orderInfo: {}
            }
        },
        methods: {
            getOrderInfo(orderId) {
                if (this.$store.authUser) {
                    this.$http.get('https://apitest.burgerpizzoni.ru/api/Profiles/getHistoryById?id_Order=' + orderId + '&access_token=' + this.$store.state.authUser.id).then((response) => {
                        this.data.orderInfo = response.data;
                    })
                }
            }
        },
        props: ["menu", "tags", "foods", "orderid", "status"]
    };
</script>
