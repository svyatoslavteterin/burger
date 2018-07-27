<template>
<div class="set-burgers">
            <div class="set-burgers-center">
                <div class="top-text-block">
                    <div class="set-burgers-text1">Сет из трех минибургеров</div>
                    <div class="set-burgers-text2">Выберите любые три минибургера</div>
                </div>
                <div class="burgers-block">
                    <div class="burger-cart">
                        <img src="./img/burger_classic_maxi.png" class="burger-img">
                        <div class="select-burger-block">
                            <div class="number-burger">1</div>
                            <select class="selecttor-burger">
                                <option>Пункт 1</option>
                                <option>Пункт 2</option>
                            </select>
                        </div>
                        <div class="burger-cart-text">
                            Мацарелла <span class="burger-cart-text-span">x</span>
                            томаты <span class="burger-cart-text-span">x</span>
                            соус <span class="burger-cart-text-span">x</span>
                            песто <span class="burger-cart-text-span">x</span>
                            руккла <span class="burger-cart-text-span">x</span>
                            соуса ба <span class="burger-cart-text-span">x</span>
                        </div>
                        <div class="add">добавить</div>
                        <div class="burger-weight">195 г</div>
                    </div>
                    <div class="burger-cart-plus">+</div>
                    <div class="burger-cart">
                        <img src="./img/icons_burger_plc.png" class="burger-img dont-select">
                        <div class="select-burger-block">
                            <div class="number-burger">2</div>
                            <select class="selecttor-burger">
                                <option>Пункт 1</option>
                                <option>Пункт 2</option>
                            </select>
                        </div>
                        <div class="dont-select-burger-text">
                            должен быть выбран мини бургер
                        </div>
                    </div>
                    <div class="burger-cart-plus">+</div>
                    <div class="burger-cart">
                        <img src="./img/icons_burger_plc.png" class="burger-img dont-select">
                        <div class="select-burger-block">
                            <div class="number-burger">3</div>
                            <select class="selecttor-burger">
                                <option>Пункт 1</option>
                                <option>Пункт 2</option>
                            </select>
                        </div>
                        <div class="dont-select-burger-text">
                            должен быть выбран мини бургер
                        </div>
                    </div>
                </div>
                <div class="lower-block">
                    <div class="grey-line"></div>
                    <div class="lower-block-center">
                        <div class="burger-price">590</div>
                        <span class="burger-price-span">₽</span>
                        <div class="add-to-card">в корзину</div>
                    </div>
                    <div class="grey-line"></div>
                </div>
            </div>
        </div>
</template>
<script>
import "./style.scss";

export default {};
</script>

