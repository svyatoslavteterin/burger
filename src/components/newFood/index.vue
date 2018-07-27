<template>
  <div class="container">

  <modal name="info" height="auto" adaptive v-cloak>
    <div class="modal-header">
      <button @click="$modal.hide('info')" class="info-modal-close"></button>
      <div class="info-yellow-block"></div>
      <div class="info-title">С белыми грибами и трюфельной пастой и еще чем-то и еще</div>
    </div>
    <div class="info-modal-pic">
      <img src="./img/modal-pic.png" alt="">
    </div>
    <div class="scrollbar-wrapper">
      <VuePerfectScrollbar class="modal-scrollbar" v-once :settings="settings" @ps-scroll-y="scrollHanle">
        <p>
          <span>Состав:</span> оливковое масло, соль, перец, чеснок, помидоры
        </p>
        <p>
          <span>Описание:</span> Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
        </p>
        <div class="empty-gap"></div>
      </VuePerfectScrollbar>
      
      <div class="fade-out-block"></div>
    </div>
  </modal>

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
          <a class="i-add" @click.prevent="mods.include = !mods.include">добавить</a>
          <div class="include-mods" >
            <ul :class="{active: mods.include}">
              123
            </ul>
          </div>
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
        <div class="pic" @click="$modal.show('info')">
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
          <img src="./img/pizzoni_parts_03.jpg" alt="">
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
          <img src="./img/pizzoni_parts_04.jpg" alt="">
          <div class="arrow"></div>
          <div class="detail">
            <div class="detail-img"></div>
            <div class="detail-text">подробнее</div>
          </div>
        </div> <!--pic-->
      </div> <!--food-->

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
          <img src="./img/pizzoni_parts_05.jpg" alt="">
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
          <img src="./img/pizzoni_parts_06.jpg" alt="">
          <div class="arrow"></div>
          <div class="detail">
            <div class="detail-img"></div>
            <div class="detail-text">подробнее</div>
          </div>
        </div> <!--pic-->
      </div> <!--food-->

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
          <img src="./img/pizzoni_parts_07.jpg" alt="">
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
          <img src="./img/pizzoni_parts_08.jpg" alt="">
          <div class="arrow"></div>
          <div class="detail">
            <div class="detail-img"></div>
            <div class="detail-text">подробнее</div>
          </div>
        </div> <!--pic-->
      </div> <!--food-->

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
          <img src="./img/pizzoni_parts_09.jpg" alt="">
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
          <img src="./img/pizzoni_parts_10.jpg" alt="">
          <div class="arrow"></div>
          <div class="detail">
            <div class="detail-img"></div>
            <div class="detail-text">подробнее</div>
          </div>
        </div> <!--pic-->
      </div> <!--food-->

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
          <img src="./img/pizzoni_parts_11.jpg" alt="">
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
          <img src="./img/pizzoni_parts_12.jpg" alt="">
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
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import dishmod from "@/components/dishmod.vue";
import "./style.scss";

export default {
  components: { VuePerfectScrollbar, dishmod },
  data() {
    return {
      settings: {
        maxScrollbarLength: 60
      },
      activeDish: 0,
      mods: {
        include: false,
        exclude: false
      }
    };
  }
};
</script>
