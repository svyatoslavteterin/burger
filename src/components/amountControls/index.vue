<template>
    <div class="counter-block">
        <button class="counter" @click="decrement">−</button>
        <span class="label-counter">{{count}}</span>
        <button class="counter" @click="increment">+</button>
    </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      decrement() {
        this.$emit('decrement');
      },
      increment() {
        this.$emit('increment');
      }
    },
    props: ['count']


  }
</script>