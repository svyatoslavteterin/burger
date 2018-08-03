<template>
    <div v-if="type=='include'">
        <div :class="{dishmod: true, 'right-side': rightSide}" v-show="!okButton">
            <div class="modal-header">
                <button class="info-modal-close" @click="okButton = !okButton">OK</button>
                <div class="info-yellow-block">Добавлено</div>
                <div class="info-title">
                <span v-if="this.$store.getters.getModsSum[dishId]">
                +
                <span v-text="this.$store.getters.getModsSum[dishId]"></span>
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
</template>

<script>
  import VuePerfectScrollbar from "vue-perfect-scrollbar";
  import dishModItem from "./item.vue";
  import "./style.scss";

  export default {
    mounted() {
      const test = this.$el.clientWidth + this.$el.getBoundingClientRect().left;
      if (test > window.innerWidth) {
        this.rightSide = true;
      }
    },

    components: {VuePerfectScrollbar, dishModItem},
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

