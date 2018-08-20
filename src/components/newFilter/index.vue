<template>
  <div class="filter" v-click-outside="hide">
    <button class="btn btn-slim filter-btn" @click.prevent="toggleFilters">Фильтр</button>
    <ul :class="{show:showFilters}" class="filter__options">
      <li :class="{active:isActive(filter.idTag)}" v-for="(filter,index) in filters" v-bind:key="index">
        <a href="#" @click.prevent="addFilter(filter.idTag)">{{filter.tagName}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import "./style.scss";
  import Popper from "popper.js";
  import ClickOutside from 'vue-click-outside'

  export default {
    methods: {
      hide() {
        this.showFilters = 0;
      },
      isActive: function (idTag) {
        if (this.$store.state.filters.indexOf(idTag) >= 0) {
          return true;
        } else {
          return false;
        }
      },
      addFilter: function (idTag) {
        this.$store.commit("addFilter", {value: idTag});
      },
      toggleFilters: function () {
        if (this.showFilters) {
          this.showFilters = 0;
        } else {
          this.showFilters = 1;
        }
      }
    },
    created() {
    },
    data() {
      return {
        showFilters: 0
      };
    },

    ready: function () {
    },

    props: ["filters"],
    mounted: function () {
      var reference = document.querySelector(".filter");
      var popper = document.querySelector(".filter__options");

      new Popper(reference, popper, {
        // popper options here
      });
      this.popupItem = this.$el;
    },
    directives: {
      ClickOutside
    },
    computed: {}
  };
</script>
