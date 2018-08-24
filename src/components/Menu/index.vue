<template>
  <section class="menu">

    <div class="menu-header">

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

    <ul
      v-for="(area, i) in menu"
      :key="area.id"
      class="categ-items"
      ref="dishesList"
      v-show="activeArea === i || lazyLoad.includes(i)"
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
      listener: null,
      count: 0,
    };
  },
  mounted() {
    const list = this.$refs.dishesList;
    this.count = this.activeArea;
    this.lazyLoad.push(this.activeArea);

    this.listener = window.addEventListener('scroll', () => {
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
  },
  beforeDestroy() {
    console.log('destroy');
    removeEventListener('scroll', this.listener);
    this.listener = null;
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
    },
  },
};
</script>

<style lang="scss" scoped>
@import './_styles.scss';
</style>

