<template>
    <cart/>
</template>

<script>
// @ is an alias to /src
import cart from "@/components/Cart";

export default {
  name: "Cart",
  components: {
    cart
  }
  // props: ["cartItems"]
};
</script>