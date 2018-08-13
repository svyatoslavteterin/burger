<template>
  <modal
    name="delivery"
    class="delivery"
    height="auto"
    :classes="'v--modal with-overflow-off'"
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

      <Address />

      <Login v-if="!this.$store.getters.getAuthUser.id"  :template="'small'"/>
      <div class="recieve-code-wrapper" style="justify-content: center;">
        <div class="send-button" @click="saveDelivery">Сохранить</div>
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
            <label class="rb-container"><span class="address-value">Мира, 71</span>
              <span class="work-time">08:00 – 18:00, Открыто</span>
              <input type="radio" checked="checked" name="radio" @click="checkAddress">
              <span class="checkmark"></span>
            </label>
            <label class="rb-container"><span class="address-value">Рябиновый, 16</span>
              <span class="work-time">Круглосуточно</span>
              <input type="radio" name="radio" @click="checkAddress">
              <span class="checkmark"></span>
            </label>

            <label class="rb-container"><span class="address-value">Бульвар Ленина, 2</span>
              <span class="work-time">08:00 – 18:00, Открыто</span>
              <input type="radio" name="radio" @click="checkAddress">
              <span class="checkmark"></span>
            </label>
            <label class="rb-container"><span class="address-value">Рудакова, 52А</span>
              <span class="work-time">Круглосуточно</span>
              <input type="radio" name="radio" @click="checkAddress">
              <span class="checkmark"></span>
            </label>

            <label class="rb-container"><span class="address-value">Приморский бульвар, 101</span>
              <span class="work-time">08:00 – 18:00, Открыто</span>
              <input type="radio" name="radio" @click="checkAddress">
              <span class="checkmark"></span>
            </label>
            <label class="rb-container"><span class="address-value">Приморский бульвар, 110</span>
              <span class="work-time">Круглосуточно</span>
              <input type="radio" name="radio" @click="checkAddress">
              <span class="checkmark"></span>
            </label>

            <label class="rb-container"><span class="address-value">Победы, 40</span>
              <span class="work-time">08:00 – 18:00, Открыто</span>
              <input type="radio" name="radio" @click="checkAddress">
              <span class="checkmark"></span>
            </label>
            <label class="rb-container"><span class="address-value">Космосольская, 2</span>
              <span class="work-time">Круглосуточно</span>
              <input type="radio" name="radio" @click="checkAddress">
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
  import Login from "@/components/Login";
  import Address from "@/components/address-component/";
  import "./style.scss";

  export default {
    components: {VuePerfectScrollbar,Login,Address},
    mixins: [modalActions],
    data() {
      return {
        okButton: false,
        okDelivery: false,
        okSelfDelivery: false,
        deliveryInfo: {
          "Street": '',
          "House": '',
          "Housing": '',
          "Structure": '',
          "Office": '',
          "Entrance": '',
          "DoorphoneСode": '',
          "Floor": '',
          "Apartment": ''
        },
        activeTab: 1,
        addresses: [],
        houses: [],
        house: "",
        q: "",
        address: "",
        street: ""
      };
    },
    methods: {
      saveDelivery(){
        this.$store.commit("setDeliveryInfo", this.deliveryInfo);
        this.$modal.hide('delivery');
      },
      checkAddress: function (e) {
        let container = e.target.parentNode;

        let addressValue = container.querySelector(".address-value").innerText;
        this.address = addressValue;
      },
      clearSearch() {
        this.q = "";
      },
      setStreet(street) {
        this.deliveryInfo.Street = street;
      },
      setHouse(house) {
        this.deliveryInfo.House = house;
      },
      getAdresses: async function () {
        try {
          let response = await this.$http.get(
            "https://apitest.burgerpizzoni.ru/api/Address/get?street=" +
            this.q +
            "&access_token=" +
            this.$store.state.authUser.id
          );
          return response.data;
        } catch (e) {
          this.errors.address.request = "Ошибка при получении адресов";
        }
      },
      showAddresses() {
        this.getAdresses(this.q).then(addresses => {
          if (typeof addresses != "undefined") {
            this.addresses = addresses;
          }
        });
      }
    },
    computed: {
      fullAddress: function () {
        return this.deliveryInfo.Street + "," + this.deliveryInfo.House;
      },
      query: {
        set: function (newValue) {
          this.showAddresses();
          this.q = newValue;

          if (this.deliveryInfo.Street && this.deliveryInfo.House) {
            let addressArr = this.q.split(",");
            let house = addressArr[1];
            let street = addressArr[0];

            if (!street) {
              this.deliveryInfo={};
              return;
            }
            if (this.addresses[street]) {
              this.deliveryInfo.House = '';
            } else {
              if (this.addresses[street].houses.indexOf(house) < 0) {
                this.deliveryInfo.House = '';
              }
            }
          } else {
            if (this.deliveryInfo.Street) {
              if (this.addresses.indexOf(this.deliveryInfo.Street) < 0) {
                this.deliveryInfo.Street = '';
                this.deliveryInfo.House = '';
              }
            } else {
              this.deliveryInfo.Street = '';
              this.deliveryInfo.House = '';
            }
          }
        },
        get: function () {
          if (this.deliveryInfo.Street) {
            if (this.deliveryInfo.House) {
              return this.fullAddress;
            } else {
              return this.deliveryInfo.Street;
            }
          } else {
            return this.q;
          }
        }
      }
    }
  };
</script>

