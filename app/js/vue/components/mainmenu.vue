<template>
<nav>
    <ul>
        <li :class="{ active: isActive(key) }" v-for="(value, key) in data"><a href="#" @click.prevent="setArea(key)">{{value.areasName}}</a></li>
    </ul>
</nav>
</template>

<script>
    module.exports = {
        methods: {
            isActive:function(index){

                if (index==store.state.area){
                    return true;
                }
            },
            setArea:function(index){
                store.commit('changeArea',{'value':index});
            }
        },
        created() {

        },
        data() {
            return {
                activeDish: 0
            }
        },

        props: ['data'],

        ready: function () {

        },
        mounted: function () {

        },
        computed: {

        }
    }
</script>