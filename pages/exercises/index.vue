<template>
  <div class="exercises-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Ćwiczenia</template>
    </Header>
    <section class="p11 column">
      <div class="category-buttons row j-between">
        <nuxt-link class="button-tertiary" :to="{ query: { cat: 'strength' } }" exact>Siła</nuxt-link>
        <nuxt-link class="button-tertiary" :to="{ query: { cat: 'speed' } }" exact>Szybkość</nuxt-link>  
        <nuxt-link class="button-tertiary" :to="{ query: { cat: 'power' } }" exact>Moc</nuxt-link>
      </div>
      <div>
      </div>
    </section>
  </div>
</template>

<script>
  import getAllExercises from '~/apollo/queries/getAllExercises.gql';

  export default {
    asyncData(context) {
      let client = context.app.apolloProvider.defaultClient;
      return client.query({ query: getAllExercises })
        .then(({ data }) => {
          return {
            exercises: data.exercises
          }
        });
    },
    computed: {
      filter() {
        return this.$route.query.cat;
      },
      filteredExercises() {
        return this.exercises.filter(exercise => {
          return exercise.category == this.filter;
        });
      }, 
    }
  }
</script>


<style lang="scss" scoped>
  .button-tertiary {
    padding: .5rem 1rem;
  }

  .nuxt-link-active {
    background-color: color(primary);
    color: white;
  }

  iframe {
    width: 100%;
  }
</style>