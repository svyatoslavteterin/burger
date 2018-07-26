<template>
  <div class="container">
    <div class="items">
      <div class="food">
        <div class="chars">
          <div class="title">Куриная</div>
          <div class="ingrids">
            <div class="i-item">
                мясо
              <span>✕</span>
            </div>
            <div class="i-item">
              перец
              <span>✕</span>
            </div>
            <div class="i-item">
              моцарелла
              <span>✕</span>
            </div>
            <div class="i-item">
              помидоры
              <span>✕</span>
              </div>
            
          </div>
          <a class="i-add" @click.prevent="mods.include=!mods.include">добавить</a>
          <div class="sizes">
            <div class="size">
              <span class="btn mini-size active">мини</span>
              <span class="weight">410 г</span>
            </div>
            <div class="size">
              <span class="btn middle-size">мидл</span>
              <span class="weight">800 г</span>
            </div>
            <div class="size">
              <span class="btn maxi-size">макси</span>
              <span class="weight">1125 г</span>
            </div>
          </div>
          <div class="bottom">
            <div class="price">1050<sup>₽</sup></div>
            <button class="in-basket">
              <span>В корзину</span>
              <span class="count-items">2</span>
            </button>
          </div>
        </div><!--chars-->
        <div class="pic">
          <img src="./img/pizzoni_parts_01.jpg" alt="">
          <div class="arrow"></div>
          <div class="detail">
            <div class="detail-img"></div>
            <div class="detail-text">подробнее</div>
          </div>
        </div> <!--pic-->
      </div> <!--food-->

      <div class="food">
        <div class="chars">
          <div class="title">С белыми грибами и трюфельной пастой</div>
          <div class="ingrids">
            <div class="i-item">
                мясо
              <span>✕</span>
            </div>
            <div class="i-item">
              перец
              <span>✕</span>
            </div>
            <div class="i-item">
              моцарелла
              <span>✕</span>
            </div>
            
          </div>
          <a class="i-add">добавить</a>
          <div class="sizes">
            <div class="size">
              <span class="btn mini-size active">мини</span>
              <span class="weight">410 г</span>
            </div>
            <div class="size">
              <span class="btn middle-size">мидл</span>
              <span class="weight">800 г</span>
            </div>
            <div class="size">
              <span class="btn maxi-size">макси</span>
              <span class="weight">1125 г</span>
            </div>
          </div>
          <div class="bottom">
            <div class="price">1050<sup>₽</sup></div>
            <button class="in-basket">
              <span>В корзину</span>
            </button>
          </div>
        </div><!--chars-->
        <div class="pic">
          <img src="./img/pizzoni_parts_02.jpg" alt="">
          <div class="arrow"></div>
          <div class="detail">
            <div class="detail-img"></div>
            <div class="detail-text">подробнее</div>
          </div>
        </div> <!--pic-->
      </div> <!--food-->

      

    </div> <!--items-->
  </div>
</template>
<script>
import "./style.scss";

export default {
  
}
</script>
