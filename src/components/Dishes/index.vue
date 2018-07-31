<template>
    <div class="sizes">
        <dishItem :dishData="dishData" :index="index" v-for="(dishData,index) in dishes" :key="dishData.id"
                  :active="isActive(index)" v-on:setActiveDish="setActiveDish"></dishItem>
    </div>
</template>
<script>
  import dishItem from './item.vue';

  export default {
    components: {
      dishItem
    },
    methods: {
      isActive: function (index) {
        return index == this.activeDish ? true : false;
      },
      setActiveDish(index) {
        this.$emit('setActiveDish',index);
      }
    },
    data() {
      return {}
    },
    props: ["dishes", "activeDish"]
  }
</script>