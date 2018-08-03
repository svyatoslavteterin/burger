<template>
    <div>
        <MainOffer :menu="menu"></MainOffer>
        <section id="mainnavbar">
            <div class="container">
                <div class="row v-middle">
                    <div class="col-lg-1 col-xl-1 logo">
                        <img src="@/assets/images/logo.svg" alt="logo" class="img-fluid"/>
                    </div>
                    <div class="col-lg-3 col-xl-3">
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
                    <div class="container">
                        <Foods :foods="foods"></Foods>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    // @ is an alias to /src
    import MainMenu from "@/components/newMainMenu";
    import filters from "@/components/newFilter";
    import Foods from "@/components/newFood";
    import MainOffer from "@/components/mainOffer";
    import search from "@/components/newSearch";

    export default {
        name: "home",
        components: {
            MainOffer,
            MainMenu,
            Foods,
            filters,
            search
        },
        props: ["menu", "tags", "foods"]
    };
</script>
