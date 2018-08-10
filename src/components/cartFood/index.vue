<template>
    <div class="drinks">
        <foodItem v-for="food in foods" :key="food.id" :data="food" :showWeight="showWeight"></foodItem>
    </div> <!--items-->
</template>
<script>
import foodItem from "./item.vue";
import "./style.scss";

export default {
  components: { foodItem },

  props: ["foods", "showWeight"]
};
</script>
