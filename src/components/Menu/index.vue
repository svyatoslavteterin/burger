<template>
  <section class="menu">

    <div
      :class="{
        'menu-header': true,
        'top': menuFloat
      }"
      ref="menuHeader"
    >
      <Search />

      <div class="menu-header__categ-names">
        <button
          v-for="(area, i) in menu"
          :key="area.areasName"
          v-text="area.areasName"
          :class="{'active': activeArea === i}"
          @click="changeArea(i)"
        />
      </div>
    </div>
    <div v-show="menuFloat" ref="stub" class="stub" />

    <div class="content-container" ref="container">
      <ul
        v-for="(area, i) in menu"
        :key="area.id"
        :id="`l-${i}`"
        ref="dishesList"
        :class="{
          'categ-items': true,
        }"
      >
        <Dish
          v-for="categ in area.categs"
          :key="`dish-${categ.categName}`"
          :categ="categ"
        />
      </ul>
    </div>

    <!-- <ul
      v-for="(area, i) in menu"
      :key="`d-${area.id}`"
      :id="`d-${i}`"
      v-show="!lazy
    //   container: this.$refs.container,
    //   childType: 'ul'
    // });Load.includes(i)"
      ref="dishesList2"
      :style="{
        'height': '150px'
      }"
    >
      {{area.areaName}}
    </ul> -->

  </section>
</template>

<script>
import Dish from '@/components/Dish';
import StickyStack from '@/assets/stickystack.js'
// import StickyStack from '@/assets/jquery.stickystack.min.js'
import Search from './search';

export default {
  name: 'Menu',
  props: {
    menu: Array,
  },
  components: { Dish, Search },
  data() {
    return {
      activeArea: 0,
      lazyLoad: [],
      areaListener: null,
      menuNavListener: null,
      menuFloat: false,
      count: 0,
    };
  },
  mounted() {
    StickyStack({
      container: this.$refs.container,
      childClass: 'categ-items'
    });
    // setTimeout(() => {
    //   $('.content-container').stickyStack({
    //     containerElement: '.content-container',
    //     stackingElement: 'ul',
    //     boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)'
    //   });
    // }, 3000)
    console.log(this);
    const list = this.$refs.dishesList;
    this.count = this.activeArea;
    this.lazyLoad.push(this.activeArea);

    this.areaListener = window.addEventListener('scroll', () => {
      const { bottom, top } = list[this.count].getBoundingClientRect();

      if (bottom < 800) {
        if (this.lazyLoad.length >= list.length) {
          return;
        }

        if (this.count >= list.length - 1) {
          return;
        }

        this.lazyLoad.push(this.count + 1);
        this.count += 1;
      }
    });

    const { menuHeader, stub } = this.$refs;

    this.menuNavListener = window.addEventListener('scroll', () => {
      const { top: topHeader } = menuHeader.getBoundingClientRect();
      const { top: topStub } = stub.getBoundingClientRect();

      if (topHeader <= 16 && !this.menuFloat) {
        this.menuFloat = true;
      }

      if (topStub > 16 && this.menuFloat) {
        this.menuFloat = false;
      }
    });
  },
  beforeDestroy() {
    removeEventListener('scroll', this.areaListener);
    this.areaListener = null;
    removeEventListener('scroll', this.menuNavListener);
    this.menuNavListener = null;
  },
  computed: {
    filterDishes() {
      return this.$store.getters.filterDishes;
    },
  },
  methods: {
    changeArea(i) {
      this.activeArea = i;

      const list = document.querySelector(`#l-${i}`);
      const list2 = document.querySelector(`#d-${i}`);

      const timer = setInterval(() => {
        const height = list.offsetTop || list2.offsetTop;
        if (list.getBoundingClientRect().top < 51 && list.getBoundingClientRect().top > 49) {
          clearInterval(timer);
          return;
        }
        window.scrollTo(0, height - 50);
      }, 50)
    },
  },
};
</script>

<style lang="scss" scoped>
@import './_styles.scss';
</style>

