<template>

    <div class="food__item__wrapper">
        <div class="food__item__img"><img :src="getImage" class="img-fluid" /></div>
        <h2 class="food__item__title" >{{data.categName}}</h2>
        <div class="food__item__ingredients">{{data.categDescr}}
        </div>
        <div class="ui-control-foodsize">
            <ul>
                <li :style="{ width: getModWidth+'%'}" :class="{ active: isActiveDish(index) }" v-for="(dish,index) in data.dishes"><a href="" @click.prevent="setActiveDish(index)">{{dish.dishName}}</a></li>
            </ul>
        </div>
        <div class="ui-controls-ingred row">
            <div class="col-sm-6  col-12"><a href="#" class="add-to-dish btn"><i class="icon-plus-circled"></i>Добавить в
                блюдо</a></div>

            <div class="col-sm-6 col-12 "><a href="#" class="remove-from-dish btn"><i class="icon-minus-circled"></i>Убрать из
                блюда</a></div>

        </div>
        <div class="food__item__bottom">
            <div class="row v-middle">
                <div class="col-lg-4 col-xl-4 col-md-4 col-4 food__item__price">
                    <span v-text="getPrice"></span> ₽
                </div>
                <div class="col-lg-3 col-xl-3  col-md-4 col-8 food__item__weight">
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
                let dishData={
                    id:this.data.id,
                    dishName:this.data.dishes[this.activeDish].dishName,
                    dishShortName:this.data.dishes[this.activeDish].dishShortName,
                    dishExtName:this.data.ExternalName,
                    price:this.data.dishes[this.activeDish].Price,
                    outPrice:this.data.dishes[this.activeDish].OutPrice,
                    sellType:"COUNT",
                    mods:[],
                    idShop:3,
                    position:this.data.ShowOrder,
                    fullData:this.data.dishes[this.activeDish].fullData
                };

                store.commit('addToCart',{'value':dishData});
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
                let price=0;
                if (typeof this.data.dishes[this.activeDish]!="undefined"){
                    price=this.data.dishes[this.activeDish].Price.slice(0, -3);
                }
                return price;

            },
            getWeight:function(){
                if (typeof this.data.dishes[this.activeDish]!="undefined") {
                    return this.data.dishes[this.activeDish].fullData.ExitMass;
                }
            },
            getImage:function(){
                let imageUrl='';
               // if (this.data.ImageName.indexOf('empty')>0){
                   imageUrl='./assets/images/200x200.png';
              //  }else{
                   // imageUrl='http://api.burger.jmedia.pro/public/images/'+this.data.id+'/430-275/'+this.data.ImageName;
              //  }
                return imageUrl;
            },
            getModWidth:function(){

                return 100/this.data.dishes.length;
            }
        }
    }
</script>
