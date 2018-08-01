<template>
  <div class="delivery" v-if="!okButton">
    <div class="modal-header">
      <button @click="okButton = !okButton" class="info-modal-close"></button>
      <div class="info-yellow-block">Способ покупки</div>
      <div class="info-title"></div>
    </div>
    <div class="modal-wrapper">
      <div class="hello-message">Введите ваш адрес и мы сообщим, входит ли он в зону доставки</div>

      <input class="search-input" type="text" placeholder="Адрес доставки">

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

    </div>
  </div>
</template>
<script>
import "./style.scss";

export default {
  data() {
    return {
      okButton: false,
      okDelivery: false
    };
  }
};
</script>

