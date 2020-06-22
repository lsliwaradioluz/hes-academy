<template>
  <div class="programs-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Szkolenia</template>
    </Header>
    <section class="main column a-center">
      <article class="description">
        <h2 class="header--underlined">Cała wiedza w jednym miejscu</h2>
        <p>Zapoznaj się z bogatą ofertą programów szkoleniowych on-line. Wybierz ten, który odpowiada Twoim potrzebom. Wykup dożywotni dostęp i ciesz się nieograniczonym dostępem do wiedzy.</p>
      </article>
      <ul class="programs">
        <Program v-for="program in programs" :key="program.id" :program="program" />
      </ul>
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
    computed: {
      carouselColumns() {
        return 1;
      }
    },
  }
</script>

<style lang="scss" scoped>

  .description {
    h2, p {
      margin-top: 0;
      max-width: 500px;
    }

    p {
      margin-bottom: 2rem;
    }
  }

  .programs {
    width: 100%;
  }

  @media (min-width: 768px) {
    .description {
      text-align: center;
    }
    
    .programs {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }

    .program {
      margin: 1rem;
    }
  }
</style>