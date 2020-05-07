<template>
  <div class="personal-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Trenuj z nami</template>
    </Header>
    <section class="main">
      <article v-html="$md.render(content)"></article>
      <article>
        <h3 class="header--underlined">Nadal się wahasz?</h3>
        <p>Odezwij się do nas i zapytaj o szczegóły. Rozwiejemy wszystkie Twoje wątpliwości!</p>
        <ContactForm />
      </article>
    </section>
  </div>
</template>

<script>
  import getPersonalPage from '~/apollo/queries/getPersonalPage.gql';
  
  export default {
    asyncData(context) {
      let client = context.app.apolloProvider.defaultClient;
      return client.query({ query: getPersonalPage })
        .then(({ data }) => {
          return {
            ...data.trenujZNami          
          }
        });
    },
  }
</script>

<style lang="scss" scoped>
  article {
    margin-bottom: 2rem;
  }

  @media (min-width: 1024px) {
    .personal-page section {
      display: flex;
      article {
        &:nth-child(1) {
          padding-right: 2rem;
          flex-basis: 60%;
        }
        &:nth-child(2) {
          flex-basis: 40%;
          padding-left: 2rem;
          border-left: 1px solid color(texttertiary);
        } 
      }
    }
  }
</style>