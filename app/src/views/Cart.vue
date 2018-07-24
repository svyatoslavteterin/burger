<template>
    <cart :items="cartItems"></cart>
</template>

<script>
    // @ is an alias to /src
    import cart from '@/components/cart.vue'

    export default {
        name: 'Cart',
        components: {
            cart
        },
        props: ["cartItems"]
    }
</script>