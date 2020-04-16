<template>
  <div class="program">
    <div class="program-image" :style="{ backgroundImage: `url('${program.foto.url}')`}"></div>
    <div class="program-content">
      <h2>{{ program.nazwa }}</h2>
      <p>{{ program.opis }}</p>
      <nuxt-link :to="program.id" v-if="lessonIndex == null" append>Wejdź</nuxt-link>
      <nuxt-link :to="{ query: { lesson: lessonIndex }}" v-else append>Zobacz</nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      program: {
        type: Object, 
        required: true, 
      }, 
      lessonIndex: {
        type: Number, 
      }
    }
  }
</script>

<style scoped>

  .program {
    flex-basis: 30%;
    flex-grow: 0;
    border: 1px solid black;
    border-radius: 6px;
  }

  .program-image {
    background-size: cover;
    background-position: center;
    height: 150px;
    width: 100%;
  } 

  .program-content {
    padding: 1rem;
  }

  .program-content a {
    padding: 0.5rem; 
    background-color: lightgoldenrodyellow;
  }
</style>