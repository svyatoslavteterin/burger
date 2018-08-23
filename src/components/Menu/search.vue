<template>
  <div class="menu-header__search">
    <div class="menu-header__search__filters">
      <button @click="showFilters = !showFilters" class="title">фильтр</button>
      <div
        v-if="showFilters"
        class="list"
      >
        <button
          v-for="tag in tags"
          :key="tag.tagName"
          v-text="tag.tagName"
          @click="toggleFilter(tag)"
          :class="{'active': filters[tag.tagName] ? true : false}"
        />
      </div>
    </div>
    <div class="menu-header__search__input"></div>
  </div>
</template>

<script>
import { actions as cartActions } from '@/modules/cart';

export default {
  name: 'Search',
  data() {
    return {
      showFilters: false,
    };
  },
  computed: {
    tags() {
      return this.$store.getters.menuIndexesTags;
    },
    filters() {
      return this.$store.getters.filters;
    },
  },
  methods: {
    toggleFilter(tag) {
      this.$store.dispatch(cartActions.toggleFilter, tag);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-header {
  &__search {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;

    &__filters {
      position: relative;

      .title {
        width: 50%;
        background: #ffd70f;
        text-transform: uppercase;
        border: 1px solid #ffd70f;
        border-right: none;
        border-radius: 4px 0 0 4px;
        width: 100%;
        text-align: left;
        padding: 0.3rem 1.25rem;
        font-size: 1.25rem;
        text-decoration: none;
        outline: none;
        border: none;
        box-shadow: none;
        cursor: pointer;
      }

      .list {
        width: 150px;
        position: absolute;
        left: 0;
        top: 2rem;
        border-radius: 0 0 10px 10px;
        border: 2px solid #ffd70f;
        background: #fff;
        z-index: 11;
        padding: 0.5rem;

        button {
          display: block;
          outline: none;
          border: none;
          font-size: 1rem;
          height: 1.4rem;
          text-align: left;
          padding-bottom: 0.15rem;
          margin-top: 0.65rem;
          text-transform: uppercase;
          background: transparent;
          cursor: pointer;
          border-bottom: 2px solid transparent;

          &:hover {
            border-bottom: 2px solid #ffd70f;
          }

          &.active {
            font-weight: bold;
          }
        }
      }
    }

    &__input {

    }
  }
}
</style>

