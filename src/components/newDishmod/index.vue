<template>
  <div class="dishmod" v-if="!okButton">
    <div class="modal-header">
      <button class="info-modal-close" @click="okButton = !okButton">OK</button>
      <div class="info-yellow-block">Добавлено</div>
      <div class="info-title">+274<span>₽</span></div>
    </div>
    <div class="scrollbar-wrapper">
      <VuePerfectScrollbar class="modal-scrollbar" v-once :settings="settings">
        <ul class="mods">
          <li>
            <div class="mod-item">
              <span class="mod-name">Название блюда</span>
              <span class="mod-price">+100₽</span>
            </div>
            <div class="mod-actions">
              <button class="counter">–</button>
              <span class="label-counter">1</span>
              <button class="counter">+</button>
            </div>
          </li>
           <li>
            <div class="mod-item">
              <span class="mod-name">Название блюда</span>
              <span class="mod-price">+100₽</span>
            </div>
            <div class="mod-actions">
              <button class="counter">–</button>
              <span class="label-counter">1</span>
              <button class="counter">+</button>
            </div>
          </li>
           <li>
            <div class="mod-item">
              <span class="mod-name">Название блюда</span>
              <span class="mod-price">+100₽</span>
            </div>
            <div class="mod-actions">
              <button class="counter">–</button>
              <span class="label-counter">1</span>
              <button class="counter">+</button>
            </div>
          </li>
           <li>
            <div class="mod-item">
              <span class="mod-name">Название блюда</span>
              <span class="mod-price">+100₽</span>
            </div>
            <div class="mod-actions">
              <button class="counter">–</button>
              <span class="label-counter">1</span>
              <button class="counter">+</button>
            </div>
          </li>
           <li>
            <div class="mod-item">
              <span class="mod-name">Название блюда</span>
              <span class="mod-price">+100₽</span>
            </div>
            <div class="mod-actions">
              <button class="counter">–</button>
              <span class="label-counter">1</span>
              <button class="counter">+</button>
            </div>
          </li>
           <li>
            <div class="mod-item">
              <span class="mod-name">Название блюда</span>
              <span class="mod-price">+100₽</span>
            </div>
            <div class="mod-actions">
              <button class="counter">–</button>
              <span class="label-counter">1</span>
              <button class="counter">+</button>
            </div>
          </li>
           <li>
            <div class="mod-item">
              <span class="mod-name">Название блюда</span>
              <span class="mod-price">+100₽</span>
            </div>
            <div class="mod-actions">
              <button class="counter">–</button>
              <span class="label-counter">1</span>
              <button class="counter">+</button>
            </div>
          </li>
           <li>
            <div class="mod-item">
              <span class="mod-name">Название блюда</span>
              <span class="mod-price">+100₽</span>
            </div>
            <div class="mod-actions">
              <button class="counter">–</button>
              <span class="label-counter">1</span>
              <button class="counter">+</button>
            </div>
          </li>
           <li>
            <div class="mod-item">
              <span class="mod-name">Название блюда</span>
              <span class="mod-price">+100₽</span>
            </div>
            <div class="mod-actions">
              <button class="counter">–</button>
              <span class="label-counter">1</span>
              <button class="counter">+</button>
            </div>
          </li>
           <li>
            <div class="mod-item">
              <span class="mod-name">Название блюда</span>
              <span class="mod-price">+100₽</span>
            </div>
            <div class="mod-actions">
              <button class="counter">–</button>
              <span class="label-counter">1</span>
              <button class="counter">+</button>
            </div>
          </li>
           <li>
            <div class="mod-item">
              <span class="mod-name">Название блюда</span>
              <span class="mod-price">+100₽</span>
            </div>
            <div class="mod-actions">
              <button class="counter">–</button>
              <span class="label-counter">1</span>
              <button class="counter">+</button>
            </div>
          </li>
        </ul>
      </VuePerfectScrollbar>
      
      <!-- <div class="fade-out-block"></div> -->
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
      okButton: false
    };
  }
};
</script>

