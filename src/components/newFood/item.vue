<template>
    <div class="food">
        <div class="chars">
            <div class="title">{{data.categName}}</div>
            {{data.categDescr}}


            <dishMods></dishMods>
            <modGroups></modGroups>
            <div class="bottom">
                <div class="price"> <span v-text="getPrice"></span><span>₽</span></div>
                <div class="weight"> <span v-text="getWeight"></span>  г.</div>
                <button class="in-basket" v-show="!showCounter" @click="showCounter = !showCounter">В корзину</button>
                <div v-show="showCounter" class="counter-block">
                    <amountControls></amountControls>
                </div>
            </div>
        </div><!--chars-->
        <div class="pic" @click="$modal.show('info')">
            <img src="./img/pizzoni_parts_03.jpg" alt="">
            <div class="arrow"></div>
            <div class="detail">
                <div class="detail-img"></div>
                <div class="detail-text">подробнее</div>
            </div>
        </div> <!--pic-->
    </div> <!--food-->
</template>

<script>
    import dishMods from "@/components/newDishmod";
    import dishModItem from "@/components/newDishmod/item.vue";

    export default {
        components: {dishMods, dishModItem,amountControls,modGroups},
        props: ["data"]
    }
</script>