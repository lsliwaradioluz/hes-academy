<template>
  <div class="exercise-page">
    <Header background="wysilek.jpg">
      <template v-slot:header>{{ exercise.name }}</template>
      <template v-slot:caption>{{ exercise.alias }}</template>
    </Header>
    <section class="p11">
      <article>
        <button class="flaticon-left-arrow p00" type="button" @click="$router.go(-1)"></button>
        <h2>Wideo</h2>
        <VideoPlayer :src="exercise.video" />
      </article>
      <article>
        <h2>Opis</h2>
        <p>{{ exercise.description }}</p>
      </article>
    </section>  
  </div>
</template>

<script>
  import getSingleExercise from '~/apollo/queries/getSingleExercise.gql';

  export default {
    asyncData(context) {
      let client = context.app.apolloProvider.defaultClient;
      return client.query({ query: getSingleExercise, variables: { id: context.route.params.id } })
        .then(({ data }) => {
          return {
            exercise: data.exercise
          }
        });
    },
  }
</script>

<style lang="scss" scoped>
  iframe {
    width: 100%;
  }
</style>