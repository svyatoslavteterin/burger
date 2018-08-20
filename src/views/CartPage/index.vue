<template>
    <cart :foods="foods" :menu="menu" />
</template>

<script>
import cart from "@/components/Cart/index.vue";
export default {
  name: "CartPage",
  components: {
    cart
  },
  props: ["foods", "menu"],
  watch: {
    $route(to, from) {
      if (to.name === "cart") {
        document
          .querySelector(".basket-block")
          .classList.add("hide-minibasket");
      }
      if (from.name === "cart") {
        document
          .querySelector(".basket-block")
          .classList.remove("hide-minibasket");
      }
    }
  }
};
</script>
<style>
.hide-minibasket {
  display: none !important;
}
</style>
