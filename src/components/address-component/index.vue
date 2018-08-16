<template>
  <div>
    <div class="delivery-search-wrapper">
      <input
        class="search-input lab-1"
        type="text"
        ref="searchAddressInput"
        v-model="fullAddr.Street"
        @input="searchAddress"
        required
      />
      <label for="">Улица</label>
      <transition-group
        class="list-container result"
        name="list"
        tag="ul"
        :class="{'expand': addresses.length}"
      >
        <li
          v-for="address in addresses"
          :key="address.street"
          @click="selectStreet(address)"
        >
          {{ address.street }}
        </li>
      </transition-group>
    </div>

    <div class="small-inputs-wrapper">

      <div class="small-wrapper">
        <input
          class="small-input"
          type="text"
          v-model="fullAddr.House"
          ref="houseInput"
          @input="searchHouse"
          required
        />
        <label for="">Дом</label>
        <transition-group
          name="list"
          tag="ul"
          :class="{
            'list-container': true,
            'result': true,
            'houses-list': true,
            'expand': findingHouses.length
          }"
        >
          <li
            v-for="house in findingHouses"
            :key="`${selectedStreet.street}-${house.house}`"
            @click="selectHouse(house.house)"
          >
            {{ house.house }}
          </li>
        </transition-group>
      </div>

      <div class="small-wrapper">
        <input
          class="small-input"
          type="text"
          v-model="fullAddr.Housing"
          required
        />
        <label for="">Корпус</label>
      </div>

      <div class="small-wrapper">
        <input
          class="small-input"
          type="text"
          v-model="fullAddr.Structure"
          required
        />
        <label for="">Строение</label>
      </div>

      <div class="small-wrapper">
        <input
          class="small-input"
          type="text"
          v-model="fullAddr.Office"
          required
        />
        <label for="">Офис</label>
      </div>

    </div>
    <div class="small-inputs-wrapper">

      <div class="small-wrapper">
        <input
          class="small-input"
          type="text"
          v-model="fullAddr.Entrance"
          required
        />
        <label for="">Подъезд</label>
      </div>

      <div class="small-wrapper">
        <input
          class="small-input"
          type="text"
          v-model="fullAddr.DoorphoneСode"
          required
        />
        <label for="">Домофон</label>
      </div>

      <div class="small-wrapper">
        <input
          class="small-input"
          type="text"
          v-model="fullAddr.Floor"
          required
        />
        <label for="">Этаж</label>
      </div>

      <div class="small-wrapper">
        <input
          class="small-input"
          type="text"
          v-model="fullAddr.Apartment"
          required
        />
        <label for="">Квартира</label>
      </div>

    </div>

    <div class="need-for-odds-wrapper ">
      <input
        class="small-input"
        type="text"
        v-model="fullAddr.needOddFrom"
        required
      />
      <label for="">Дать сдачу с купюры</label>
    </div>

    <div class="modal-search-address__buttons">
      <button class="send-button save-delivery-address" v-show="fullAddr.Street && fullAddr.House"
              @click="saveAddress()">Сохранить Адрес
      </button>
    </div>
  </div>
</template>


<script>
  import "./style.scss";
  import _ from "lodash";

  export default {
    name: "SearchAddress",
    data() {
      return {
        modalSearchAddress: true,
        addresses: [],
        selectedStreet: {},
        findingHouses: [],
        fullAddr: {
          Street: "",
          House: "",
          Housing: "",
          Structure: "",
          Office: "",
          Entrance: "",
          DoorphoneСode: "",
          Floor: "",
          Apartment: "",
          needOddFrom: "",
          Comments: ""
        }
      };
    },
    methods: {
      toggleSearchAddress() {
        this.modalSearchAddress = !this.modalSearchAddress;
        if (this.modalSearchAddress) {
          setTimeout(() => {
            this.$refs.searchAddressInput.focus();
          }, 100);
        } else {
          //this.$store.dispatch(namesActions.clearSearchAddress);
          this.inputAddress = "";
          this.fullAddr = {
            Street: "",
            House: "",
            Housing: "",
            Structure: "",
            Office: "",
            Entrance: "",
            DoorphoneСode: "",
            Floor: "",
            Apartment: "",
            needOddFrom: "",
            Comments: ""
          };
        }
      },
      async searchAddress() {
        if (!this.fullAddr.Street.length) {
          this.addresses = [];
          this.fullAddr = {
            Street: "",
            House: "",
            Housing: "",
            Structure: "",
            Office: "",
            Entrance: "",
            DoorphoneСode: "",
            Floor: "",
            Apartment: "",
            needOddFrom: "",
            Comments: ""
          };
        }
        if (this.fullAddr.Street.length < 3) return;
        // this.$store.dispatch('searchAddress', this.fullAddr.Street);
        this.addresses = await this.getAddresses(this.fullAddr.Street);
      },
      getAddresses: async function (street) {
        let response = await this.$http.get(
          "https://apitest.burgerpizzoni.ru/api/Address/get?street=" + street
        );
        try {
          let response = await this.$http.get(
            "https://apitest.burgerpizzoni.ru/api/Address/get?street=" + street
          );
          return response.data;
        } catch (e) {
          this.errors.address.request = "Ошибка при получении адресов";
        }
      },
      selectStreet(address) {
        let Street = address.street;
        const isStreetPrefix = new RegExp("^[Уу]лица", "i");
        if (isStreetPrefix.test(Street)) {
          const myRegexp = new RegExp("^[Уу]лица\\s([0-9а-яА-Я\\W]+)");
          Street = myRegexp.exec(Street)[1];
        }

        this.fullAddr.Street = Street;
        this.selectedStreet = address;
        this.addresses = [];
        setTimeout(() => {
          this.$refs.houseInput.focus();
        }, 1000);
      },
      searchHouse(e) {
        const {value} = e.target;
        this.findingHouses = [];
        _.forOwn(this.selectedStreet.houses, (house) => {
          // eslint-disable-line
          if (house.house.split(" ")[0].includes(value)) {
            return this.findingHouses.push(house);
          }
        });
      },
      selectHouse(house) {

        const House = house.split(" ")[0];
        let Housing = "";
        let Structure = "";

        const isHousing = new RegExp(".*к{1}[0-9а-яА-Я]+", "i");
        if (isHousing.test(house)) {
          const myRegexp = new RegExp(".*(к{1}[0-9а-яА-Я]+)");
          Housing = myRegexp.exec(house)[1].replace("к", "");
        }

        const isStructure = new RegExp(".*с{1}[0-9а-яА-Я]+", "i");
        if (isStructure.test(house)) {
          const myRegexp = new RegExp(".*с{1}([0-9а-яА-Я]+)");
          Structure = myRegexp.exec(house)[1];
        }

        this.findingHouses = [];

        this.fullAddr = {
          ...this.fullAddr,
          House,
          Housing,
          Structure
        };
      },
      saveAddress() {
        this.modalSearchAddress = !this.modalSearchAddress;
        this.$store.commit("setDeliveryInfo", this.fullAddr);
        this.$modal.hide('delivery');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .modal-search-address__wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.75);

    .modal-search-address {
      position: relative;
      width: 90%;
      min-height: 15vh;
      margin: 7vh auto 0;
      padding: 1.5vh 3vw;

      overflow: hidden;

      input {
        display: block;
        width: 100%;
        font-size: 3.5vh;
        padding: 0.175vh 0;
        margin: 0 auto;
        border: none;

        background-color: transparent;
        text-transform: capitalize;

        &::placeholder {
          font-size: 3.75vh;
          text-transform: none;
        }

        &:focus {
          outline: none;
        }
      }

      .list-container {
        position: absolute;
        height: 0;
        top: 2.75vh;
        width: 100%;
        margin: 0;
        overflow-y: auto;
        z-index: 999;

        &.expand {
          height: 35vh;
          margin: 1vh 0;

          &.houses-list {
            height: 22vh;
          }
        }
      }

      ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        transition: all 0.2s linear;

        li {
          position: relative;
          font-size: 2.75vh;
          top: 0;
          padding: 1.25vh 2vw;
          line-height: 1;
          transition: all 0.25s;

          &:nth-child(even) {
          }

          &.list-enter {
            opacity: 0;
            transform: translateX(-50px);
          }

          &.list-leave-to {
            opacity: 0;
            transform: translateX(-50px);
          }
        }
      }
    }
  }

  .address-options {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    position: relative;

    & .address-options__title {
      display: block !important;
      width: 100%;
      font-size: 2.5vh;
      margin-bottom: 1.5vh;
      text-align: center !important;
    }

    & > div {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      position: relative;
      width: 100%;
      margin-bottom: 1vh;

      &.address-options__street {
        & input {
          padding-left: 7vh;
          text-align: left;
        }
      }

      & span {
        position: absolute;
        left: 0.5vh;
        font-size: 1.75vh !important;
        bottom: 0.25vh;
        opacity: 0.75;
      }

      & > div {
        width: 48%;
        margin-bottom: 1vh;
        position: relative;
      }

      & input {
        width: 100%;
        position: relative;
        background-color: transparent;
        border: none;
        outline: none;
        font-size: 2.5vh !important;
        line-height: 1;
        padding: 2vh 0.5vh 0.25vh;
        text-align: right;
      }
    }

    & textarea {
      background-color: transparent;
      line-height: 1.15;
      outline: none;
      width: 100%;
      margin: 1.5vh 0;
      padding: 0.5vh;
      font-size: 1.75vh;
      height: 10vh !important;
    }
  }
</style>


