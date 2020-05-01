<template>
  <nuxt-link
    :to="`/programs/${program.id}`"
    tag="div" 
    class="program column j-end" 
    :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.9)), url('${program.image.url}')`}">
    <h3>{{ program.name }}</h3>
    <p class="m00">{{ program.description }}</p>
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
  .program {
    position: relative;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    min-height: 350px;
    margin-bottom: 1rem;
    color: white;
    padding: 1rem;
    h3 {
      margin-bottom: 0.5rem;
    }
  }
</style>