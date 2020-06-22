<template>
  <footer class="footer">
    <div class="footer__image column a-center j-center">
      <h2 class="footer__image__title">Im dłużej czekasz na przyszłość, tym będzie krótsza</h2>
      <button
        class="footer__image__button button-secondary"
        type="button"
        @click="contactFormOpen = true"
      >
        Skontaktuj się z nami
      </button>
      <Modal :show="contactFormOpen" @close="contactFormOpen = false">
        <div class="footer__form">
          <h2 class="footer__form__header">Napisz do nas</h2>
          <p>
            Odezwij się do nas i zapytaj o szczegóły. Rozwiejemy wszystkie Twoje
            wątpliwości!
          </p>
          <ContactForm
            success-message="Wiadomośc wysłana pomyślnie. Odpowiemy na nią najszybciej, jak to możliwe!"
            @success="contactFormOpen = false"
          />
          <button
            class="button-tertiary footer__form__close-button"
            type="button"
            @click="contactFormOpen = false"
          >
            Anuluj
          </button>
        </div>
      </Modal>
    </div>
    <div class="footer__links main">
      <a :href="`mailto:${stopka.email}`" class="flaticon-email footer__link">
        <p class="footer__link-caption">{{ stopka.email }}</p>
      </a>
      <a
        :href="`tel:${stopka.telephone}`"
        class="flaticon-telephone footer__link"
      >
        <p class="footer__link-caption">{{ stopka.telephone }}</p>
      </a>
      <a
        :href="stopka.facebook"
        class="flaticon-facebook footer__link"
        target="_blank"
      >
        <p class="footer__link-caption">Facebook</p>
      </a>
      <a
        :href="stopka.instagram"
        class="flaticon-instagram footer__link"
        target="_blank"
      >
        <p class="footer__link-caption">Instagram</p>
      </a>
      <a
        href="https://www.google.pl/maps/place/Hes+Gym%26Fitness/@51.143802,16.8750906,17z/data=!3m1!4b1!4m5!3m4!1s0x470f955069fee439:0xce59025c1425f3db!8m2!3d51.1437987!4d16.8772792"
        class="flaticon-map footer__link"
        target="_blank"
      >
        <p class="footer__link-caption">{{ stopka.address }}</p>
      </a>
    </div>
    <p class="footer__signature">
      Coded by Łukasz Śliwa. Icons made by
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik"
        >Freepik</a
      >
      from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </p>
  </footer>
</template>

<script>
import getFooter from "~/apollo/queries/getFooter.gql";

export default {
  apollo: {
    stopka: {
      query: getFooter
    }
  },
  data() {
    return {
      contactFormOpen: false
    };
  }
};
</script>

<style lang="scss" scoped>
.footer__image {
  padding: 5rem 1rem;
  background-attachment: fixed;
  background-size: cover;
  background-image: linear-gradient(
      rgba(0, 189, 255, 0.4),
      rgba(0, 189, 255, 0.4)
    ),
    url("../assets/images/przyszlosc.jpg");
}

.footer__image__title {
  text-transform: uppercase;
  color: white;
  text-align: center;
  margin-top: 0;
}

.footer__image__button {
  padding-left: 2rem;
  padding-right: 2rem;
  letter-spacing: .3px;
}

.footer__form {
  background-color: white;
  padding: 1rem;
  color: black;
  max-width: 500px;
  margin: 0 auto;
}

.footer__form__header {
  margin: 0 0 1rem 0;
}

.footer__form__close-button {
  margin-top: 0.5rem;
  width: 100%;
}

.footer__links {
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  padding: 1.5rem 0;
  transition: opacity 0.3s;
  &:hover {
    opacity: .7;
  }
}

.footer__link-caption {
  margin: 0;
  font-weight: 400;
  margin-top: 0.5rem;
}

.footer__signature {
  background-color: black;
  margin: 0;
  padding: 1rem;
  color: color(textsecondary);
  border-top: 1px solid color(faded);
  text-align: center;
  font-size: 12px;
}

@media (min-width: 1024px) {
  .footer__image {
    padding: 8rem 1rem;
    font-size: 26px;
  }

  .footer__image__button {
    padding: 1rem 3rem;
    font-size: 20px;
  }

  .footer__links {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
