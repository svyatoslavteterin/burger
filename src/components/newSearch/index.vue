<template>
    <div class="search-wrapper-nav">
      <input class="search-input" type="text" v-model="query" placeholder="Поиск" required>
      <button class="search-btn"></button>
      <button class="clear-btn" @click="clearSearch"></button>
      <ul class="result" style="display:none;">
        <li>Пиццони</li>
        <li>Пиццони</li>
        <li>Пиццони</li>
        <li>Пиццони</li>
        <li>Пиццони</li>
        <li>Пиццони</li>
      </ul>
    </div>
</template>

<script>
import "./style.scss";

export default {
  methods: {},
  created() {},
  data() {
    return {
      q: ""
    };
  },

  props: ["data"],

  ready: function() {},
  mounted: function() {},
  computed: {
    query: {
      get: function() {
        return this.$store.state.q;
      },
      set: function(newValue) {
        this.$store.commit("changeSearchQuery", { value: newValue });
      }
    }
  }
};
</script>
