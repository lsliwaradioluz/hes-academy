<template>
  <div class="personal-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Trenuj z nami</template>
    </Header>
    <article class="personal-page__content main">
      <section class="mobile" v-html="$md.render(introduction)"></section>
      <aside class="personal-page__panel">
        <nav class="personal-page__buttons">
          <button
            class="personal-page__button flaticon-right-chevron"
            type="button"
            v-for="(partnership, index) in partnerships"
            :key="partnership.id"
            @click="scrollToSection(index)"
          >
            {{ partnership.name }}
          </button>
        </nav>
        <div class="personal-page__contact">
          <h3 class="personal-page__contact-header">Nie wiesz co wybrać?</h3>
          <p class="personal-page__contact-text">Odezwij się do nas i zapytaj o szczegóły. Rozwiejemy wszystkie Twoje wątpliwości!</p>
          <ContactForm secondary />
        </div>
      </aside>
      <section class="personal-page__partnerships">
        <div class="desktop" v-html="$md.render(introduction)"></div>
        <div class="personal-page__partnership" v-for="(partnership, index) in partnerships" :key="partnership.id" :ref="index">
          <h2 class="personal-page__partnership-name">{{ partnership.name }}</h2>
          <div v-html="$md.render(partnership.description)"></div>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
import getPersonalPage from "~/apollo/queries/getPersonalPage.gql";

export default {
  asyncData(context) {
    let client = context.app.apolloProvider.defaultClient;
    return client.query({ query: getPersonalPage }).then(({ data }) => {
      return {
        ...data.trenujZNami
      };
    });
  },
  methods: {
    scrollToSection(reference) {
      const element = this.$refs[reference][0];
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
};
</script>

<style lang="scss" scoped>

  .personal-page__panel {
    background-color: color(primary);
    padding: 1rem 1rem 2rem 1rem;
    margin-top: 2rem;
  }

  .personal-page__button {
    color: white;
    padding: 1rem 0;
    display: block;
    font-size: 18px;
    text-align: left;
  }

  .personal-page__partnership {
    margin-top: 2rem;
  }

  .personal-page__contact {
    margin-top: 2rem;
  }

  .personal-page__contact-header,
  .personal-page__contact-text {
    color: white;
  }

  .desktop { 
    display: none;
  }

  @media (min-width: 1024px) {
    .personal-page__content {
      display: flex;
      flex-direction: row-reverse; 
      align-items: flex-start;
    }

    .personal-page__panel {
      flex-basis: 30%;
      flex-shrink: 0;
      margin-left: 2rem;
      position: sticky;
      top: 4rem;
      padding: 1.5rem 1.5rem 2.5rem 1.5rem;
    }

    .desktop {
      display: block;
    }

    .mobile {
      display: none;
    }
  }
</style>
