<template>
  <div v-click-outside="$emit('hide')">
    <div :class="{ dishmod: true, 'right-side': rightSide }" v-show="okButton===false">
      <div class="modal-header">
        <button class="info-modal-close" @click="$emit('hide')">OK</button>
        <div class="info-title">
          <!-- <span v-if="this.$store.getters.getModsSum[dishId]"> -->
            +
            <!-- <span v-text="+this.$store.getters.getModsSum[dishId]"></span> -->
            ₽
          <!-- </span> -->
        </div>
      </div>
      <div class="scrollbar-wrapper">
        <VuePerfectScrollbar class="modal-scrollbar" v-once :settings="settings">
          <ul class="mods">
            <dishModItem
              v-for="(mod) in mods"
              :key="mod.id_Mod"
              :mod="mod"
              :dishId="dishId"
              :dish="dish"
              :type="'include'"
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
  mounted() {
    if (this.type !== 'include') return;
    const { right } = this.$el
      .querySelector('.dishmod')
      .getBoundingClientRect();

    console.log(right, window.innerWidth);
    if (right > window.innerWidth) {
      this.rightSide = true;
    }
    this.popupItem = this.$el;
  },
  directives: {
    ClickOutside,
  },
  components: { VuePerfectScrollbar, dishModItem },
  data() {
    return {
      settings: {
        maxScrollbarLength: 60,
      },
      okButton: false,
      rightSide: false,
    };
  },
  props: ['mods', 'dishId', 'type', 'dish'],
};
</script>

<style lang="scss" scoped>
@import './_styles.scss';
</style>

