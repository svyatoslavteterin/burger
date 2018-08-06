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
        <p >
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
  import "./style.scss";

  export default {
    methods: {
      beforeOpen(event) {
        debugger
        this.data = event.params.data;
        this.activeDish = event.params.activeDish;
      },
      getImage: function () {
        const imageUrl = `https://imgtest.burgerpizzoni.ru/_img/Rest/${
          this.data.dishes[this.activeDish].fullData.Images[0].ImageName
          }`;

        return imageUrl;
      },
    },

    components: {VuePerfectScrollbar, dishMods},
    data() {
      return {
        data:{},
        activeDish:0
      }
    },
    mixins: [modalActions]
  };
</script>
