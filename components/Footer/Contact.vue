<template>
  <div class="contact main">
    <h2 class="contact__title">
      Im dłużej czekasz na przyszłość, tym będzie krótsza
    </h2>
    <div class="contact__buttons">
      <button
        class="contact__button button-primary"
        type="button"
        @click="contactFormOpen = true"
      >
        Skontaktuj się z nami
      </button>
      <nuxt-link class="contact__button button-primary" to="/programs"
        >Sprawdź ofertę szkoleń</nuxt-link
      >
    </div>
    <Modal :show="contactFormOpen" @close="contactFormOpen = false">
      <div class="contact__form">
        <h2 class="contact__form__header">Napisz do nas</h2>
        <p>
          Odezwij się do nas i zapytaj o szczegóły. Rozwiejemy wszystkie Twoje
          wątpliwości!
        </p>
        <ContactForm
          success-message="Wiadomośc wysłana pomyślnie. Odpowiemy na nią najszybciej, jak to możliwe!"
          @success="contactFormOpen = false"
        />
        <button
          class="button-tertiary contact__form__close-button"
          type="button"
          @click="contactFormOpen = false"
        >
          Anuluj
        </button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contactFormOpen: false
    };
  }
};
</script>

<style lang="scss" scoped>
.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../../assets/images/przyszlosc.jpg");
}

.contact__title {
  text-transform: uppercase;
  color: white;
  text-align: center;
  margin-top: 0;
}

.contact__buttons {
  display: flex;
  flex-direction: column;
}

.contact__button {
  padding: 1rem 2rem;
  margin-bottom: 1rem;
}

.contact__form {
  background-color: white;
  padding: 1rem;
  color: black;
  max-width: 500px;
  margin: 0 auto;
}

.contact__form__header {
  margin: 0 0 1rem 0;
}

.contact__form__close-button {
  margin-top: 0.5rem;
  width: 100%;
}

@media (min-width: 1024px) {
  .contact__title {
    font-size: 56px;
    max-width: 1200px;
  }

  .contact__buttons {
    flex-direction: row;
  }

  .contact__button {
    margin-bottom: 0;
    margin: 0 1rem;
  }
}
</style>
