<template>
  <div>
    <div class="address-options">
      <div class="address-options__street">
        <span>Улица</span>
        <input
          type="text"
          ref="searchAddressInput"
          v-model="fullAddr.Street"
          @input="searchAddress"
        />
        <transition-group
          class="list-container"
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
      <div>
        <div>
          <span>Дом</span>
          <input
            v-model="fullAddr.House"
            type="text"
            ref="houseInput"
            @input="searchHouse"
          />
          <transition-group
            name="list"
            tag="ul"
            :class="{
                    'list-container': true,
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
        <div>
          <span>Корпус</span>
          <input v-model="fullAddr.Housing" type="text"/>
        </div>
      </div>
      <div>
        <div>
          <span>Строение</span>
          <input v-model="fullAddr.Structure" type="text"/>
        </div>
        <div>
          <span>Офис</span>
          <input v-model="fullAddr.Office" type="text"/>
        </div>
      </div>
      <div>
        <div>
          <span>Подъезд</span>
          <input v-model="fullAddr.Entrance" type="text"/>
        </div>
        <div>
          <span>Домофон</span>
          <input v-model="fullAddr.DoorphoneСode" type="text"/>
        </div>
      </div>
      <div>
        <div>
          <span>Этаж</span>
          <input v-model="fullAddr.Floor" type="text"/>
        </div>
        <div>
          <span>Квартира</span>
          <input v-model="fullAddr.Apartment" type="text"/>
        </div>
      </div>
      <div>
        <span>Дать сдачу с купюры</span>
        <input v-model="fullAddr.needOddFrom" type="text"/>
      </div>
    </div>

    <div class="modal-search-address__buttons">
      <button v-show="fullAddr.Street && fullAddr.House" @click="saveAddress()">Сохранить</button>
    </div>
  </div>
</template>


<script>

  export default {
    name: 'SearchAddress',
    data() {
      return {
        modalSearchAddress: true,
        selectedStreet: {},
        findingHouses: [],
        fullAddr: {
          Street: '',
          House: '',
          Housing: '',
          Structure: '',
          Office: '',
          Entrance: '',
          DoorphoneСode: '',
          Floor: '',
          Apartment: '',
          needOddFrom: '',
          Comments: ''
        }
      };
    },
    computed: {
      addresses() {
        return this.getAddresses();
      }
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
          this.inputAddress = '';
          this.fullAddr = {
            Street: '',
            House: '',
            Housing: '',
            Structure: '',
            Office: '',
            Entrance: '',
            DoorphoneСode: '',
            Floor: '',
            Apartment: '',
            needOddFrom: '',
            Comments: ''
          };
        }
      },
      searchAddress() {
        if (!this.fullAddr.Street.length) {
          // this.$store.dispatch(namesActions.clearSearchAddress);
        }
        if (this.fullAddr.Street.length < 3) return;
        //this.$store.dispatch(namesActions.searchAddress, this.fullAddr.Street);
      },
      getAddresses: async function () {
        try {
          let response = await this.$http.get(
            "https://apitest.burgerpizzoni.ru/api/Address/get?street=" +
            this.q
          );
          return response.data;
        } catch (e) {
          this.errors.address.request = "Ошибка при получении адресов";
        }
      },
      selectStreet(address) {
        let Street = address.street;
        const isStreetPrefix = new RegExp('^[Уу]лица', 'i');
        if (isStreetPrefix.test(Street)) {
          const myRegexp = new RegExp('^[Уу]лица\\s([0-9а-яА-Я\\W]+)');
          Street = myRegexp.exec(Street)[1];
        }

        this.fullAddr.Street = Street;
        this.selectedStreet = address;
        //this.$store.dispatch(namesActions.clearSearchAddress);
        setTimeout(() => {
          this.$refs.houseInput.focus();
        }, 1000);
      },
      searchHouse(e) {
        const {value} = e.target;
        this.findingHouses = [];
        this.selectedStreet.houses.forEach((house) => { // eslint-disable-line
          if (house.house.split(' ')[0].includes(value)) {
            return this.findingHouses.push(house);
          }
        });
      },
      selectHouse(house) {
        const House = house.split(' ')[0];
        let Housing = '';
        let Structure = '';

        const isHousing = new RegExp('.*к{1}[0-9а-яА-Я]+', 'i');
        if (isHousing.test(house)) {
          const myRegexp = new RegExp('.*(к{1}[0-9а-яА-Я]+)');
          Housing = myRegexp.exec(house)[1].replace('к', '');
        }

        const isStructure = new RegExp('.*с{1}[0-9а-яА-Я]+', 'i');
        if (isStructure.test(house)) {
          const myRegexp = new RegExp('.*с{1}([0-9а-яА-Я]+)');
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
        // this.$store.dispatch(namesActions.saveAddress, this.fullAddr);
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
        transition: all .2s linear;

        li {
          position: relative;
          font-size: 2.75vh;
          top: 0;
          padding: 1.25vh 2vw;
          line-height: 1;
          transition: all .25s;

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

      .modal-search-address__buttons {
        display: flex;
        justify-content: space-between;

        button {
          width: 47.5%;
          font-size: 3vh;
          padding: 0.5vh 0;
          outline: none;
          border: none;

          &:disabled {
            opacity: 0;
          }

          &:first-child {

          }

          &:last-child {

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


