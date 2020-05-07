<template>
  <div 
    class="coach column j-end" 
    :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.9)), url('${coach.image.url}')`}">
    <h2>{{ coach.name }}</h2>
    <p class="coach-text">{{ coach.description }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      coach: {
        type: Object, 
        required: true, 
      }
    }
  }
</script>

<style lang="scss" scoped>

  .coach {
    height: 100vh;
    background-size: cover;
    background-position: center;
    color: color(white);
    padding: 1rem;
  }

  .coach h2 {
    margin: 0;
  }

  .coach-text {
    font-size: 14px;
    margin-bottom: 0;
  }

  @media (min-width: 1024px) {
    .coach {
      height: 500px;
      width: 350px;
    }
  }
</style>