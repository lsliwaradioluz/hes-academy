<template>
  <div class="exercise">
    <article>
      <section>
        <nuxt-link class="return-button flaticon-left-arrow p00" to="/exercises"></nuxt-link>
        <h2 class="m00">{{ exercise.name }}</h2>
        <p class="mt0 fs-14 t-textsecondary">{{ exercise.alias }}</p>
        <VideoPlayer :src="exercise.video" />
      </section>
      <section>
        <h2>Opis</h2>
        <p>{{ exercise.description }}</p>
      </section>
      <section v-if="exercise.products.length > 0">
        <h2>Do tego ćwiczenia przyda Ci się:</h2>
        <ProductThumb v-for="product in exercise.products" :key="product.id" :product="product" />
      </section>
    </article>  
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