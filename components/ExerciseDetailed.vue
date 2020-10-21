<template>
  <article class="exercise-detailed">
    <section>
      <nuxt-link
        class="exercise-detailed__return-button flaticon-left-arrow"
        to="/exercises"
      ></nuxt-link>
      <h2 class="exercise-detailed__name">{{ exercise.name }}</h2>
      <p class="mt0 fs-14 t-textsecondary">{{ exercise.alias }}</p>
      <VideoPlayer :src="exercise.video" />
    </section>
    <section class="exercise__detailed__details">
      <h3 class="exercise__detailed__details__header">Opis</h3>
      <p v-if="exercise.description">{{ exercise.description }}</p>
      <p v-else>To ćwiczenie nie ma jeszcze opisu.</p>
    </section>
    <section class="exercise__detailed__products">
      <h3 class="exercise__detailed__products__header">
        Powiązane produkty
      </h3>
      <ProductThumb
        v-for="product in exercise.products"
        :key="product.id"
        :product="product"
      />
      <p v-if="exercise.products.length === 0">
        Z tym ćwiczeniem nie są powiązane żadne produkty.
      </p>
    </section>
  </article>
</template>

<script>
export default {
  props: {
    exercise: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.exercise-detailed__return-button {
  padding: 0;
  margin-bottom: 1rem;
  font-size: 20px;
}
.exercise-detailed__name {
  margin: 0;
}

.exercise__detailed__details__header,
.exercise__detailed__products__header {
  font-size: 24px;
  margin-bottom: 0.5rem;
}

iframe {
  width: 100%;
}

@media (min-width: 1024px) {
  .exercise-detailed {
    border-left: 1px solid color(texttertiary);
    padding-left: 2rem;
    flex-basis: 100%;
    flex-grow: 1;
  }

  .exercise-detailed__return-button {
    display: none;
  }
}
</style>
