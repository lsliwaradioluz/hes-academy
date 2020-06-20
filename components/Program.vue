<template>
  <nuxt-link
    class="program tab"
    :to="`/programs/${program.id}`" 
    tag="li"
    :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${program.image.url}')`}">
    <h3 class="program__name">{{ program.name }}</h3>
    <p class="program__description">{{ program.description | shorten(120) }}</p>
  </nuxt-link>
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

<style lang="scss" scoped>

  .program__name {
    font-size: 22px;
    margin-bottom: .5rem;
  }

  .program__description {
    margin: 0;
    opacity: 0.85;
  }

  @media (min-width: 1024px) {
    .program__name {
      font-size: 24px;
    }
  }
</style>