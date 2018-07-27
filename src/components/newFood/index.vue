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
      <VuePerfectScrollbar class="modal-scrollbar" v-once :settings="settings">
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
      <!--Модалка и добавление модификаторов только на первый элемент, измененное отображение модификаторов тоже только у первого-->
      <div class="food">
        <div class="chars">
          <div class="title">Наименование в две строки</div>
          <div class="ingrids">
            <div class="i-item">
              <span class="mod-name">мясо</span>
              <span class="mod-delete-icon"></span>
            </div>
            <div class="i-item">
              <span class="mod-name mod-name-deleted">лук</span>
              <span class="mod-return-icon"></span>
            </div>
            <div class="i-item">
              <span class="mod-name mod-name-deleted">помидоры</span>
              <span class="mod-return-icon"></span>
            </div>
            <div class="i-item">
              <span class="mod-name mod-name-deleted">помидоры</span>
              <span class="mod-return-icon"></span>
            </div>
            <div class="i-item">
              <span class="mod-name mod-name-deleted">помидоры</span>
              <span class="mod-return-icon"></span>
            </div>
            <div class="i-item">
              <span class="mod-name mod-name-deleted">помидоры</span>
              <span class="mod-return-icon"></span>
            </div>
            <div class="i-item">
              <span class="mod-name mod-name-deleted">помидоры</span>
              <span class="mod-return-icon"></span>
            </div>
            <div class="i-item">
              <span class="mod-name mod-name-deleted">перец</span>
              <span class="mod-return-icon"></span>
            </div>
            
          </div>
          <a class="i-add" @click.prevent="mods.include = !mods.include">добавить</a>
          <a class="i-more">развернуть</a>
          <div class="include-mods" >
            <newDishmod v-if="mods.include"></newDishmod>
          </div>
          <div class="sizes">
            <div class="btn mini-size active">мини</div>
            <div class="btn middle-size">мидл</div>
            <div class="btn maxi-size">макси</div>
          </div>
          <div class="bottom">
            <div class="price">1 050<span>₽</span></div>
            <div class="weight">1125 г.</div>
            <button class="in-basket" v-show="!showCounter" @click="showCounter = !showCounter">В корзину</button>
            <div v-show="showCounter" class="counter-block">
              <button class="counter">−</button>
              <span class="label-counter">1</span>
              <button class="counter">+</button>
            </div>
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
import newDishmod from "@/components/newDishmod";
import "./style.scss";

export default {
  components: { VuePerfectScrollbar, dishmod, newDishmod },
  data() {
    return {
      showCounter: false,
      settings: {
        maxScrollbarLength: 60
      },
      activeDish: 0,
      mods: {
        include: false,
        exclude: false
      }
    };
  },
  props: ["data"],
  methods: {
    isActiveDish: function(index) {
      if (index == this.activeDish) {
        return true;
      }
    },
    addToCart: function() {
      let dishData = {
        id: this.data.dishes[this.activeDish].id,
        dishName: this.data.dishes[this.activeDish].dishName,
        dishShortName: this.data.dishes[this.activeDish].dishShortName,
        dishExtName: this.data.ExternalName,
        price: this.data.dishes[this.activeDish].Price,
        outPrice: this.data.dishes[this.activeDish].OutPrice,
        sellType: "COUNT",
        mods: [],
        idShop: 3,
        position: this.data.ShowOrder,
        fullData: this.data.dishes[this.activeDish].fullData
      };

      this.$store.commit("addToCart", { value: dishData });
      alert("Добавлено");
    },
    setActiveDish: function(index) {
      this.activeDish = index;
    }
  },
  computed: {
    dishData: function() {
      return this.data.dishes[this.activeDish];
    },
    getPrice: function() {
      let price = 0;
      if (typeof this.data.dishes[this.activeDish] != "undefined") {
        price = this.data.dishes[this.activeDish].Price.slice(0, -3);
      }
      return price;
    },
    getWeight: function() {
      if (typeof this.data.dishes[this.activeDish] != "undefined") {
        return this.data.dishes[this.activeDish].fullData.ExitMass;
      }
    },
    getModWidth: function() {
      return 100 / this.data.dishes.length;
    }
  }
};
</script>
