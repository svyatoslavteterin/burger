<template>
  <modal name="info" height="auto" adaptive v-cloak>
    <div class="modal-header-info">
      <div class="info-yellow-block"></div>
      <div class="info-title">Куриная</div>
      <button @click="$modal.hide('info')" class="info-modal-close"></button>
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
            <span>Описание:</span> Lorem Ipsum - это текст-"рыба", часто используемый в печати и
            вэб-дизайне.
            Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время
            некий
            безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для
            распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но
            и
            перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов
            Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной
            вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
            Его популяризации в новое время послужили публикация листов
            Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной
            вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
            Его популяризации в новое время послужили публикация листов
            Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной
            вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
          </p>
          <div class="empty-gap"></div>
      </VuePerfectScrollbar>

      <div class="fade-out-block"></div>
    </div>
  </modal>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import "./style.scss";

export default {
  components: { VuePerfectScrollbar }
};
</script>
