<template>
    <div class="search-input">
        <input type="text" placeholder="Поиск" v-model="query"  />
    </div>
</template>

<script>
    export default {
        methods: {


        },
        created() {

        },
        data() {
            return {
                q:''
            }
        },

        props: ['data'],

        ready: function () {

        },
        mounted: function () {

        },
        computed: {
            query: {
                get:function(){
                    return this.$store.state.q;
                },
                set:function(newValue){
                    this.$store.commit('changeSearchQuery',{"value":newValue});

                }
            }
        }
    }
</script>
