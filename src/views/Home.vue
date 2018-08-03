<template>
  <div>
    <div class="container">
      <div class="slide">
        <h2 class="slider__title">Беспая доставка!</h2>
        <p class="slider__desc">Подарим Вам 300 бонусных рублей, если наш курьер
          не успеет доставить заказ
          в течение 60 минут.</p>
        <a class="btn slider-btn btn-white btn-shadow" href="#">Подробнее</a>
      </div>
    </div>
    <section id="mainnavbar">
      <div class="container">
        <div class="row v-middle">
          <div class="col-lg-1 col-xl-1 logo">
            <img src="@/assets/images/logo.svg" alt="logo" class="img-fluid"/>
          </div>
          <div class="col-lg-8 col-xl-8  ">
            <mainmenu :data="menu"></mainmenu>
          </div>
          <div class="col-lg-3 col-xl-3    ">
            <filters :filters="tags"></filters>

            <search></search>

          </div>
        </div>

      </div>
    </section>
    <section id="main">
      <div class="container food">

        <div class="row">
          <div class="col-12 col-md-6  col-lg-4 col-xl-4   food__item" v-for="food in foods" v-bind:key="food.id">
            <food :data="food"></food>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
  // @ is an alias to /src
  import mainmenu from '@/components/mainmenu.vue'
  import filters from '@/components/filter.vue'
  import food from '@/components/food.vue'
  import search from '@/components/search.vue'

  export default {
    name: 'home',
    components: {
      mainmenu, filters, food, search
    },
    props: ["menu", "tags", "foods"]
  }
</script>
