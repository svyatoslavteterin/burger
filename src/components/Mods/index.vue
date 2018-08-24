<template>
  <div v-click-outside="hide">
    <div class="dishmod-arrow"></div>
    <div :class="{ dishmod: true, 'right-side': rightSide }" v-show="okButton===false">
      <div class="modal-header">
        <button class="info-modal-close" @click="hide">OK</button>
        <div class="info-title">
          Добавить
          <span
            v-if="getModsSumm"
            v-html="`+ ${$options.filters.Rub(getModsSumm)}`"
          />
        </div>
      </div>
      <div class="modal-border"></div>
      <div class="scrollbar-wrapper">
        <VuePerfectScrollbar
          v-once
          class="modal-scrollbar"
          :settings="settings"
          @ps-scroll-y="scrollY"
        >
          <ul class="mods">
            <dishModItem
              v-for="(mod) in mods"
              :key="mod.id_Mod"
              :mod="mod"
              :dish="dish"
            ></dishModItem>
          </ul>
        </VuePerfectScrollbar>
        <div class="fade-out-block-top hide"></div>
        <div class="fade-out-block-bottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import ClickOutside from 'vue-click-outside';
import dishModItem from './item.vue';

export default {
  components: { VuePerfectScrollbar, dishModItem },
  props: ['mods', 'dishId', 'type', 'dish'],
  data() {
    return {
      settings: {
        maxScrollbarLength: 60,
      },
      okButton: false,
      rightSide: false,
      innerWidth: 0,
    };
  },
  directives: {
    ClickOutside,
  },
  beforeMount() {
    this.innerWidth = window.innerWidth;
  },
  mounted() {
    const { right } = this.$el.querySelector('.dishmod').getBoundingClientRect();
    if (right > this.innerWidth) {
      this.rightSide = true;
    }
    this.popupItem = this.$el;
  },
  computed: {
    getModsSumm() {
      let summ = 0;
      const len = this.mods.length;
      for (let i = 0; i < len; i += 1) {
        if (this.mods[i].count) {
          summ += this.mods[i].Price * this.mods[i].count;
        }
      }
      return summ;
    },
  },
  methods: {
    hide() {
      this.$emit('hide');
    },
    scrollY(e) {
      const fadeBlockTop = document.querySelector('.fade-out-block-top');
      const fadeBlockBottom = document.querySelector('.fade-out-block-bottom');
      if (e.target.scrollTop <= 5) {
        fadeBlockTop.classList.add('hide');
      } else {
        fadeBlockTop.classList.remove('hide');
      }
      if (e.target.scrollTop >= 440) {
        fadeBlockBottom.classList.add('hide');
      } else {
        fadeBlockBottom.classList.remove('hide');
      }
    },
  },
};
</script>

<style lang="scss">
@import './_styles.scss';
</style>

