<template>
  <div>
    <MainOffer :menu="menu" v-if="menu.length>0"></MainOffer>
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
  import MainMenu from "@/components/MainMenu";
  import filters from "@/components/Filter";
  import Foods from "@/components/Food";
  import MainOffer from "@/components/mainOffer";
  import search from "@/components/Search";

  export default {
    name: "home",
    components: {
      MainOffer,
      MainMenu,
      Foods,
      filters,
      search
    },
    props: ["menu", "tags", "foods"],
    data() {
      return {
        menuEl: '',
      }
    },
    mounted() {
      this.menuEl = document.getElementById("mainnavbar");
      window.addEventListener('scroll', this.setFixed);
    },
    destroyed () {
      window.removeEventListener('scroll', this.setFixed);
    },
    methods: {
      setFixed: function() {
        if (window.pageYOffset > this.menuEl.offsetTop) {
          this.menuEl.classList.add("fixed");
        } else {
          this.menuEl.classList.remove("fixed");
        }
      }
    }
  };
</script>
