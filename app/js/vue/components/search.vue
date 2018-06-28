<template>
    <div class="search-input">
        <input type="text" placeholder="Поиск" v-model="query"  />
    </div>
</template>

<script>
    module.exports = {
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
                    return store.state.q;
                },
                set:function(newValue){
                    store.commit('changeSearchQuery',{"value":newValue});

                }
            }
        }
    }
</script>
