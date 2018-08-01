<template>
  <div class="samovivoz" v-if="!okButton">
    <div class="modal-header">
      <button @click="okButton = !okButton" class="info-modal-close"></button>
      <div class="info-yellow-block">Способ покупки</div>
      <div class="info-title"></div>
    </div>
    <div class="modal-wrapper">
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
      <button class="selfdelivery-btn" @click="okDelivery = !okDelivery">ОК</button>

      <div v-if="okDelivery" class="thank-you-message">
        <p>Спасибо!</p>
        <p>Вы успешно оформили заказ для самовывоза.</p>
        <p>Нажмите ОК, если Вы заберёте его по адресу:</p>
        <p class="address">г. Санкт-Петербург, ул. Петрозаводская 13, кв. 48, подъезд 14, этаж 21</p>
        <p>Заказ будет готов через 30 минут</p>
        <button @click="okDelivery = !okDelivery">ОК</button>
      </div>

    </div>
  </div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import "./style.scss";

export default {
  components: { VuePerfectScrollbar },
  data() {
    return {
      okButton: false,
      okDelivery: false
    };
  }
};
</script>

