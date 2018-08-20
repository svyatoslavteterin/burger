<template>
    <div>
        <MainOffer></MainOffer>
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
                    <Food></Food>
                </div>
            </div>
        </section>
        <BurgerSet></BurgerSet>
    </div>
</template>

<script>
// @ is an alias to /src
import MainMenu from "@/components/MainMenu";
import filters from "@/components/Filter";
import Food from "@/components/Food";
import MainOffer from "@/components/mainOffer";
import search from "@/components/Search";
import BurgerSet from "@/components/BurgerSet";

export default {
  name: "home",
  components: {
    MainOffer,
    MainMenu,
    Food,
    filters,
    search,
    BurgerSet
  },
  props: ["menu", "tags", "foods"]
};
</script>
