<template>
  <div v-if="type=='include'">
    <ul class="mods">
      <dishModItem
        :key="mod.id_Mod"
        :data="mod"
        :dishId="dishId"
        :type="'include'"
        v-for="(mod) in mods"
      />
    </ul>
  </div>
</template>

<script>
import dishModItem from "./item.vue";
import "./style.scss";

export default {
  components: { dishModItem },
  data() {
    return {
      okButton: false,
      rightSide: false
    };
  },
  props: ["mods", "dishId", "type"]
};
</script>

