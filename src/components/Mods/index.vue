<template>
  <div v-click-outside="hide">
    <div :class="{ dishmod: true, 'right-side': rightSide }" v-show="okButton===false">
      <div class="modal-header">
        <button class="info-modal-close" @click="hide">OK</button>
        <div class="info-title">
          <span
            v-if="getModsSumm"
            v-html="`+ ${$options.filters.Rub(getModsSumm)}`"
          />
        </div>
      </div>
      <div class="scrollbar-wrapper">
        <VuePerfectScrollbar class="modal-scrollbar" v-once :settings="settings">
          <ul class="mods">
            <dishModItem
              v-for="(mod) in mods"
              :key="mod.id_Mod"
              :mod="mod"
              :dish="dish"
            ></dishModItem>
          </ul>
        </VuePerfectScrollbar>

        <!-- <div class="fade-out-block"></div> -->
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
    };
  },
  directives: {
    ClickOutside,
  },
  mounted() {
    const { right } = this.$el
      .querySelector('.dishmod')
      .getBoundingClientRect();

    console.log(right, window.innerWidth);
    if (right > window.innerWidth) {
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
  },
};
</script>

<style lang="scss" scoped>
@import './_styles.scss';
</style>

