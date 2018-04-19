<template>

    <div class="food__item__wrapper">
        <div class="food__item__img"><img :src="getImage" class="img-fluid" width="200"/></div>
        <h2 class="food__item__title" >{{data.categName}}</h2>
        <div class="food__item__ingredients">Бифштекс, лук, помидор, салат латук,
            помидор, бифштекс, лук.
        </div>
        <div class="ui-control-foodsize">
            <ul>
                <li :class="{ active: isActiveDish(index) }" v-for="(dish,index) in data.dishes"><a href="" @click.prevent="setActiveDish(index)">{{dish.dishName}}</a></li>
            </ul>
        </div>
        <div class="ui-controls-ingred row">
            <div class="col-sm-6  "><a href="#" class="add-to-dish btn"><i class="icon-plus-circled"></i>Добавить в
                блюдо</a></div>

            <div class="col-sm-6  "><a href="#" class="remove-from-dish btn"><i class="icon-minus-circled"></i>Убрать из
                блюда</a></div>

        </div>
        <div class="food__item__bottom">
            <div class="row v-middle">
                <div class="col-lg-4 col-xl-4 col-md-4 food__item__price">
                    <span v-text="getPrice"></span> ₽
                </div>
                <div class="col-lg-3 col-xl-3  col-md-4 food__item__weight">
                    <span v-text="getWeight"></span> г
                </div>
                <div class="col-lg-5 col-xl-5 padding0 col-md-4 ">
                    <button class="food__item__btn btn btn-add-to-cart" @click.prevent="addToCart">В корзину</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        methods: {
            isActiveDish:function(index){
                if (index==this.activeDish){
                    return true;
                }
            },
            addToCart:function(){
                store.commit('addToCart',{'value':this.data.id});
                alert('Добавлено');
            },
            setActiveDish:function(index){
                this.activeDish=index;
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
            getPrice:function(){
                return this.data.dishes[this.activeDish].Price;
            },
            getWeight:function(){
                return this.data.dishes[this.activeDish].fullData.ExitMass;
            },
            getImage:function(){
                return 'http://89.223.25.82/_img/Rest/'+this.data.ImageName;
            }
        }
    }
</script>
