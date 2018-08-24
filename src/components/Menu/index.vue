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

    <ul
      v-for="(area, i) in menu"
      :key="area.id"
      v-show="activeArea === i || lazyLoad.includes(i)"
      class="categ-items"
      ref="dishesList"
      :style="{'order': lazyLoad.includes(i) ? lazyLoad.indexOf(i) + 1 : 0}"
    >
      <Dish
        v-for="categ in area.categs"
        :key="`dish-${categ.categName}`"
        :categ="categ"
      />
    </ul>

  </section>
</template>

<script>
import Dish from '@/components/Dish';
import Search from './search';

export default {
  name: 'Menu',
  props: {
    menu: Array,
  },
  components: { Dish, Search },
  data() {
    return {
      activeArea: 2,
      lazyLoad: [],
      areaListener: null,
      menuNavListener: null,
      menuFloat: false,
      count: 0,
    };
  },
  mounted() {
    const list = this.$refs.dishesList;
    this.count = this.activeArea;
    this.lazyLoad.push(this.activeArea);

    this.areaListener = window.addEventListener('scroll', () => {
      const { bottom } = list[this.count].getBoundingClientRect();
      if (bottom < 800) {
        if (this.lazyLoad.length >= list.length) {
          return;
        }
        if (this.count >= list.length - 1) {
          this.count = -1;
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
      this.count = i;
      this.lazyLoad = [];
      this.lazyLoad.push(this.activeArea);
      const { stub } = this.$refs;
      const { top } = stub.getBoundingClientRect();
      if (top < 0) {
        window.scrollTo(0, stub.offsetTop - 20);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './_styles.scss';
</style>

