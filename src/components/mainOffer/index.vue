<template>
    <div class="main-offer">
        <h1 class="main-title">Бесплатная доставка</h1>
        <div class="sub-title">burgerpizzoni.ru</div>
        <foodItem  :type="'offer'" :data="menu[2].categs[3]" :classKey="'pizza'"></foodItem>
        <foodItem  :type="'offer'" :data="menu[3].categs[0]" :classKey="'burger'"></foodItem>
    </div>
</template>
<script>
  import "./style.scss";
  import foodItem from "@/components/Food/item.vue";

  export default {
    components: {
      foodItem
    },
    data() {
      return {
        showCounter: false,
      }
    },
    props:["menu"]
  };
</script>
