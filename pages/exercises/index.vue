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
      <ul class="mt2">
        <nuxt-link 
          class="row mt05 mb05" 
          tag="li" 
          v-for="(exercise, index) in filteredExercises" 
          :key="exercise.id"
          :to="`exercises/${exercise.id}`">
          <span class="number">{{ index + 1 }}</span>
          <span class="column">
            <h3 class="m00">{{ exercise.name }}</h3>
            <p class="m00 fs-13">{{ exercise.alias }}</p>
          </span>
        </nuxt-link>
      </ul>
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
        if (this.filter) {
          return this.exercises.filter(exercise => {
            return exercise.category == this.filter;
          });
        } else {
          return this.exercises;
        }
      }, 
    }, 
  }
</script>


<style lang="scss" scoped>
  .button-tertiary {
    padding: .5rem 1rem;
    flex-grow: 1;
    text-align: center;
    &:nth-child(2) {
      margin: 0 4px;
    }
  }

  .nuxt-link-active {
    background-color: color(primary);
    color: white;
  }

  iframe {
    width: 100%;
  }

  li {
    padding: 0;
    &::before {
      display: none;
    }
  }
</style>