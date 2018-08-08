<template>
  <modal
    name="info"
    height="auto"
    @opened="openedModal"
    @closed="closedModal"
    adaptive
    v-cloak
    @before-open="beforeOpen"
  >
    <div class="modal-header-info">
      <div class="info-title" v-if="data.dishes" v-text="data.categName"></div>
      <button @click="$modal.hide('info')" class="info-modal-close"></button>
    </div>
    <div class="info-modal-pic" v-if="data.dishes">
      <img :src="getImage()" alt="">
    </div>
    <div class="scrollbar-wrapper">
      <VuePerfectScrollbar class="modal-scrollbar" v-once :settings="settings">
        <p>
          <span>Состав:</span>
          <dishMods :mods="data.dishes[this.activeDish].techCardData"
                    :dishId="data.dishes[this.activeDish].id" :type="'text'" v-if="data.dishes"></dishMods>
        </p>
        <p v-if="data.dishes">
          <span>Описание:</span> {{data.categDescr}}
        </p>
        <div class="empty-gap"></div>
      </VuePerfectScrollbar>

      <div class="fade-out-block"></div>
    </div>
  </modal>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import modalActions from "@/mixins/modalActions";
import dishMods from "@/components/newDishmod";
import FastAverageColor from "fast-average-color";
import "./style.scss";

export default {
  methods: {
    beforeOpen(event) {
      this.data = event.params.data;
      this.activeDish = event.params.activeDish;
    },
    getImage: function() {
      const imageUrl = `https://imgtest.burgerpizzoni.ru/_img/Rest/${
        this.data.dishes[this.activeDish].fullData.Images[0].ImageName
      }`;
      return imageUrl;
    },
    getColor() {
      const fac = new FastAverageColor();
      const container = document.querySelector(".info-modal-pic");
      // const img = new Image(),
      //   canvas = document.createElement("canvas"),
      //   ctx = canvas.getContext("2d"),
      //   src = imageUrl;
      const img = container.querySelector("img");

      img.crossOrigin = "Anonymous";
      img.width = img.clientWidth;
      img.height = img.clientHeight;
      // img.src = src;
      console.log("img:::", img);
      console.log(img.clientWidth);
      console.log(img.clientHeight);
      img.clientWidth;
      img.clientHeight;
      // img.onload = function() {
      //   canvas.width = img.width;
      //   canvas.height = img.height;
      //   ctx.drawImage(img, 0, 0);
      //   localStorage.setItem("savedImageData", canvas.toDataURL("image/png"));
      // };

      // // make sure the load event fires for cached images too
      // if (img.complete || img.complete === undefined) {
      //   img.src =
      //     "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      //   img.src = src;
      // }
      const color = fac.getColor(img);
      container.style.backgroundColor = color.rgba;
      container.style.color = color.isDark ? "#fff" : "#000";
      console.log("img:", img.src);
      console.log("fac:", fac);
      console.log("cont:", container);
      console.log("color:", color);
    }
  },

  components: { VuePerfectScrollbar, dishMods },
  data() {
    return {
      data: {},
      activeDish: 0
    };
  },
  mixins: [modalActions],
  mounted() {
    this.getColor();
  }
};
</script>
