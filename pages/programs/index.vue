<template>
  <div class="programs-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Programy</template>
    </Header>
    <section class="programs">
      <h2 class="header--underlined">Cała wiedza w jednym miejscu</h2>
      <p>Zapoznaj się z bogatą ofertą programów szkoleniowych on-line. Wybierz ten, który odpowiada Twoim potrzebom. Wykup dożywotni dostęp i ciesz się nieograniczonym dostępem do wiedzy.</p>
      <Program v-for="program in programs" :program="program" :key="program.id" />
    </section>
  </div>
</template>

<script>
  import getAllPrograms from '~/apollo/queries/getAllPrograms.gql';
  
  export default {
    asyncData(context) {
      let client = context.app.apolloProvider.defaultClient;
      return client.query({ query: getAllPrograms })
        .then(({ data }) => {
          return {
            programs: data.programs,        
          }
        });
    }, 
  }
</script>

<style lang="scss" scoped>
  .programs {
    padding: 3rem 1rem;
    p {
      margin-top: 0;
      margin-bottom: 2rem;
    }
  }
</style>