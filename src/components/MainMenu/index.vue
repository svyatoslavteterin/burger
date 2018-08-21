<template>
<nav class="newNav" @scroll="setFixed">
  
    <ul>
        <li :class="{ active: isActive(key) }" v-bind:key="key" v-for="(value, key) in data"><a href="#" @click.prevent="setArea(key)">{{value.areasName}}</a></li>
    </ul>
</nav>
</template>

<script>
import "./style.scss";
export default {
  methods: {
    isActive: function(index) {
      if (index == this.$store.state.area) {
        return true;
      }
    },
    setArea: function(index) {
      this.$store.commit("changeArea", { value: index });
    },
    setFixed: function() {
      console.log(window.pageYOffset);
      // if (window.pageYOffset > sticky) {
      //   header.classList.add("sticky");
      // } else {
      //   header.classList.remove("sticky");
      // }
    }
  },
  created() {},
  data() {
    return {
      activeDish: 0
    };
  },

  props: ["data"],

  ready: function() {},
  mounted: function() {},
  computed: {}
};
</script>