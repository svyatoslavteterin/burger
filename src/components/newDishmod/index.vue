<template>
  <div v-if="type=='include'" v-click-outside="hide">
    <div :class="{dishmod: true, 'right-side': rightSide}" v-show="okButton===false">
      <div class="modal-header">
        <button class="info-modal-close" @click="hide">OK</button>
        <div class="info-title">
          <span v-if="this.$store.getters.getModsSum[dishId]">
            +
            <span v-text="+this.$store.getters.getModsSum[dishId]"></span>
            ₽
          </span>
        </div>
      </div>
      <div class="scrollbar-wrapper">
        <VuePerfectScrollbar class="modal-scrollbar" v-once :settings="settings">
          <ul class="mods">
            <dishModItem :key="mod.id_Mod" :data="mod" :dishId="dishId" :type="'include'"
                         v-for="(mod) in mods"></dishModItem>
          </ul>
        </VuePerfectScrollbar>

        <!-- <div class="fade-out-block"></div> -->
      </div>
    </div>
  </div>
  <div v-else-if="type=='exclude'">
    <dishModItem :key="mod.id_Mod" :data="mod" :dishId="dishId" :type="'exclude'"
                 v-for="(mod) in mods"></dishModItem>
  </div>
  <div v-else-if="type=='text'">
    <dishModItem :key="mod.id_Mod" :data="mod" :dishId="dishId" :type="'text'"
                 v-for="(mod) in mods"></dishModItem>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import dishModItem from "./item.vue";
import ClickOutside from "vue-click-outside";
import "./style.scss";

export default {
  mounted() {
    if (!this.type !== "include") return;
    const { right } = this.$el
      .querySelector(".dishmod")
      .getBoundingClientRect();

    console.log(right, window.innerWidth);
    if (right > window.innerWidth) {
      this.rightSide = true;
    }
    this.popupItem = this.$el;
  },
  directives: {
    ClickOutside
  },

  components: { VuePerfectScrollbar, dishModItem },
  methods: {
    hide() {
      this.$emit("hide");
    }
  },
  data() {
    return {
      settings: {
        maxScrollbarLength: 60
      },
      okButton: false,
      rightSide: false
    };
  },
  props: ["mods", "dishId", "type"]
};
</script>

