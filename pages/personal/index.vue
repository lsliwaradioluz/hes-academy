<template>
  <div class="personal-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Trenuj z nami</template>
    </Header>
    <section class="main">
      <div v-html="$md.render(content)"></div>
      <h3 class="header--underlined">Nadal się wahasz?</h3>
      <p>Odezwij się do nas i zapytaj o szczegóły. Rozwiejemy wszystkie Twoje wątpliwości!</p>
      <ContactForm />
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
</style>