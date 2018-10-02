<template>
  <footer>
    <span class="email-desc">Вопросы и пожелания Вы можете прислать нам на электропочту</span>
    <a class="email" href="mailto:sos@foodkostgroup.ru">sos@foodkostgroup.ru</a>
    <div class="documents">
      <a href="#">Пользовательское соглашение</a>
      <a href="#">Все о наших блюдах</a>
      <a href="#">Политика конфиденциальности</a>
    </div>
    <div class="socials">
      <a href="#" target="_blank"><img src="./img/icons_soc_vk_gray.svg" alt="ВКонтакте"></a>
      <a href="#" target="_blank"><img src="./img/icons_soc_ok_gray.svg" alt="Одноклассники"></a>
      <a href="https://www.facebook.com/burgerpizzoni/" target="_blank"><img src="./img/icons_soc_fbk_gray.svg" alt="Facebook"></a>
      <a href="https://www.instagram.com/burgerpizzoni/" target="_blank"><img src="./img/icons_soc_inst_gray.svg" alt="Instagram"></a>
      <a href="#" target="_blank"><img src="./img/icons_soc_wtsp_gray.svg" alt="WhatsApp"></a>
      <a href="#" target="_blank"><img src="./img/icons_soc_tlgr_gray.svg" alt="Telegram"></a>
    </div>

    <div class="logos">
      <img src="./img/logo-abbr.svg" alt="">
      <span>© 2017 Burger & Pizzoni. Все права защищены.</span>
      <a href="http://foodkostgroup.ru/category/kostoev" target="_blank" class="foodkostgroup">
        <img src="./img/foodkostgroup.svg" alt="">
        <div>
          <span>Блог</span>
          <span>Магомеда</span>
          <span>Костоева</span>
        </div>
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  background-color: #f2f2f2;
  padding-top: 2rem;
  margin-top: 5rem;

  .email-desc {
    font-size: 1.25rem;
    color: #9d9d9d;
  }

  .email {
    font-size: 1.25rem;
    color: black;
    margin: 0.75rem 0 2.5rem;
  }

  .documents {
    width: 70vw;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    margin-bottom: 2.5rem;

    a {
      font-size: 1.25rem;
      color: #9d9d9d;
    }
  }

  .socials {
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 0.5rem;
      height: 2rem;

      img {
        height: 1.4rem;

      }

      &:nth-child(1) {
        img {
          height: 1.1rem;
        }
      }
    }
  }

  .logos {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 80vw;
    padding: 1vw 10vw;
    margin-top: 2rem;
    background-color: white;
    box-shadow: 3px -3px 16px 3px rgba(0, 0, 0, 0.16);

    & > img {
      margin-right: 9%;
    }

    & > span {
      font-size: 1.25rem;
      margin-left: 0.5rem;
      line-height: 1;
      color: #9d9d9d;
    }

    .foodkostgroup {
      display: flex;
      flex-flow: row nowrap;
      position: relative;
      text-decoration: none;

      img {
        width: 100%;
      }

      & > div {
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        margin-left: 0.5rem;

        span {
          font-size: 1.1rem;
          color: #9d9d9d;
        }
      }

    }
  }
}

</style>

