<template>
    <div v-show="showCounter" class="counter-block">
        <button class="counter" @click="$emit('decrement')">−</button>
        <span class="label-counter">{{count}}</span>
        <button class="counter" @click="$emit('increment')">+</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                showCounter:false
            }
        },
        methods: {},
        props: ['count']


    }
</script>