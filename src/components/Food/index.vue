<template>
    <div class="items">
        <foodItem v-for="food in foods" :key="food.id" :data="food"></foodItem>
    </div> <!--items-->
</template>
<script>
import foodItem from "./item.vue";
import "./style.scss";

export default {
  components: { foodItem },

  props: ["foods"]
};
</script>
