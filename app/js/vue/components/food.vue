<template>

    <div class="food__item__wrapper">
        <div class="food__item__img"><img src="./assets/images/food/1.jpg" class="img-fluid"/></div>
        <h2 class="food__item__title" ><span v-text="getFoodName"></span> {{data.FoodCategName}}</h2>
        <div class="food__item__ingredients">Бифштекс, лук, помидор, салат латук,
            помидор, бифштекс, лук.
        </div>
        <div class="ui-control-foodsize">
            <ul>
                <li class="active"><a href="#">Маленькая</a></li>
                <li><a href="#">Средняя</a></li>
                <li><a href="#">Большая</a></li>
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
                    597 ₽
                </div>
                <div class="col-lg-3 col-xl-3  col-md-4 food__item__weight">
                    700 г
                </div>
                <div class="col-lg-5 col-xl-5 padding0 col-md-4 ">
                    <button class="food__item__btn btn btn-add-to-cart">В корзину</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        methods: {},
        created() {

        },
        data() {
            return {
                active: 0
            }
        },

        props: ['data'],

        ready: function () {

        },
        mounted: function () {

        },
        computed: {
            getFoodName:function () {
                return this.data.foods[0].foodName;
            }
        }
    }
</script>
