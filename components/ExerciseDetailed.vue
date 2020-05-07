<template>
  <div class="exercise">
    <section>
      <article>
        <nuxt-link class="return-button flaticon-left-arrow p00" to="/exercises"></nuxt-link>
        <h2 class="m00">{{ exercise.name }}</h2>
        <p class="mt0 fs-14 t-textsecondary">{{ exercise.alias }}</p>
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

  export default {
    props: {
      exercise: {
        type: Object, 
        required: true,
      }
    }
  }
</script>

<style lang="scss" scoped>

  iframe {
    width: 100%;
  }

  @media (min-width: 1024px) {
    .exercise {
      border-left: 1px solid color(texttertiary);
      padding-left: 2rem;
      flex-basis: 100%;
      flex-grow: 1;
    }

    .return-button {
      display: none;
    }
  }
</style>