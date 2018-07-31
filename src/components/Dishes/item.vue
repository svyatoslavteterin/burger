<template>
    <div class="btn" :class="{ active: active }" @click="setActiveDish(index)">{{dishData.dishName}}</div>
</template>
<script>
  export default {
    methods: {
      setActiveDish(index) {
        this.$emit('setActiveDish', index);
      }
    },
    data() {
      return {}
    },
    computed: {},
    props: ["dishData", "active", "index"]
  }
</script>