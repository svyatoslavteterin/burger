<template>
  <modal
    name="delivery"
    class="delivery"
    height="auto"
    @opened="openedModal"
    @closed="closedModal"
    adaptive
    v-cloak
  >
    <div class="modal-header">
      <button @click="$modal.hide('delivery')" class="info-modal-close"></button>
      <div class="info-yellow-block">Способ покупки</div>
      <div
        @click="activeTab = 1"
        :class="{'tab-name': true, 'active': activeTab == 1 }"
      >
        Доставка
      </div>
      <div
        @click="activeTab = 2"
        :class="{'tab-name': true, 'active': activeTab == 2 }"
      >
        Самовывоз
      </div>
    </div>
    <div v-if="activeTab == 1" class="modal-wrapper delivery">
      <div class="hello-message">Введите ваш адрес и мы сообщим, входит ли он в зону доставки</div>

      <div class="search-wrapper">
        <input class="search-input" type="text" v-model="q" placeholder="Адрес доставки" required>
        <button class="search-btn"></button>
        <button class="clear-btn" @click="clearSearch"></button>
        <ul class="result">
          <li>Петрозаводск <span>город</span></li>
          <li>Петрозаводская <span>здание</span></li>
          <li>Петрозаводская, 13 <span>здание</span></li>
          <li>Петрозаводская, 15 <span>здание</span></li>
          <li>Петрозаводская, 7А <span>здание</span></li>
          <li>Петрозаводское шоссе <span>улица</span></li>
        </ul>
      </div>

      <div class="small-inputs-wrapper">
        <div class="small-wrapper">
          <input class="small-input" type="text" required>
          <label for="">Подъезд</label>
        </div>
        <div class="small-wrapper">
          <input class="small-input" type="text" required>
          <label for="">Этаж</label>
        </div>
        <div class="small-wrapper">
          <input class="small-input" type="text" required>
          <label for="">Квартира</label>
        </div>
        <div class="small-wrapper">
          <input class="small-input" type="text" required>
          <label for="">Домофон</label>
        </div>
      </div>

      <div class="recieve-code-wrapper">
        <div class="small-wrapper phone-wrapper">
          <input class="small-input phone-input" type="text" required>
          <label for="">Номер телефона в любом виде</label>
        </div>
        <button class="phone-btn">Получить код</button>
      </div>

      <div class="send-code-wrapper">
        <div class="small-wrapper code-wrapper">
          <input class="small-input phone-input code-input" type="text" required>
          <label for="">Код из СМС</label>
        </div>
        <button class="phone-btn code-btn" @click="okDelivery = !okDelivery">ОК</button>
      </div>
      <div class="send-link-again-wrapper">
        <a class="send-again-link" href="#">Отправить код еще раз</a>
      </div>

      <div v-if="okDelivery" class="thank-you-message">
        <p>Спасибо!</p>
        <p>Ваш адрес входит в зону нашей доставки.</p>
        <p>Нажмите ОК, если подтверждаете доставку по адресу:</p>
        <p class="address">г. Санкт-Петербург, ул. Петрозаводская 13, кв. 48, подъезд 14, этаж 21</p>
        <p>Мы доставим ваше заказ в течении 30 минут</p>
        <button @click="okDelivery = !okDelivery">ОК</button>
      </div>

    </div> <!--modal-wrapper-->

    <div v-if="activeTab == 2" class="modal-wrapper">
      <div class="hello-message">Выберите ближайший к вам филиал</div>
      <div class="addresses-wrapper">
        <VuePerfectScrollbar class="modal-scrollbar" v-once :settings="settings">
          <div class="radio-container">
            <label class="rb-container">Мира, 71
              <span class="work-time">08:00 – 18:00, Открыто</span>
              <input type="radio" checked="checked" name="radio">
              <span class="checkmark"></span>
            </label>
            <label class="rb-container">Рябиновый, 16
              <span class="work-time">Круглосуточно</span>
              <input type="radio" name="radio">
              <span class="checkmark"></span>
            </label>

            <label class="rb-container">Бульвар Ленина, 2
              <span class="work-time">08:00 – 18:00, Открыто</span>
              <input type="radio" name="radio">
              <span class="checkmark"></span>
            </label>
            <label class="rb-container">Рудакова, 52А
              <span class="work-time">Круглосуточно</span>
              <input type="radio" name="radio">
              <span class="checkmark"></span>
            </label>

            <label class="rb-container">Приморский бульвар, 101
              <span class="work-time">08:00 – 18:00, Открыто</span>
              <input type="radio" name="radio">
              <span class="checkmark"></span>
            </label>
            <label class="rb-container">Приморский бульвар, 110
              <span class="work-time">Круглосуточно</span>
              <input type="radio" name="radio">
              <span class="checkmark"></span>
            </label>

            <label class="rb-container">Победы, 40
              <span class="work-time">08:00 – 18:00, Открыто</span>
              <input type="radio" name="radio">
              <span class="checkmark"></span>
            </label>
            <label class="rb-container">Космосольская, 2
              <span class="work-time">Круглосуточно</span>
              <input type="radio" name="radio">
              <span class="checkmark"></span>
            </label>
          </div>
        </VuePerfectScrollbar>
      </div>
      <button class="selfdelivery-btn" @click="okSelfDelivery = !okSelfDelivery">ОК</button>

      <div v-if="okSelfDelivery" class="thank-you-message">
        <p>Спасибо!</p>
        <p>Вы успешно оформили заказ для самовывоза.</p>
        <p>Нажмите ОК, если Вы заберёте его по адресу:</p>
        <p class="address">г. Санкт-Петербург, ул. Петрозаводская 13, кв. 48, подъезд 14, этаж 21</p>
        <p>Заказ будет готов через 30 минут</p>
        <button @click="okSelfDelivery = !okSelfDelivery">ОК</button>
      </div>

    </div>
  </modal>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import modalActions from "@/mixins/modalActions";
import "./style.scss";

export default {
  components: { VuePerfectScrollbar },
  mixins: [modalActions],
  data() {
    return {
      okButton: false,
      okDelivery: false,
      okSelfDelivery: false,
      activeTab: 1,
      q: ""
    };
  },
  methods: {
    clearSearch() {
      this.q = "";
    }
  }
};
</script>

