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
  props: ["foods", "menu"]
};
</script>