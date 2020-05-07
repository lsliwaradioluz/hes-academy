<template>
  <div class="coach column a-center">
    <div 
      class="avatar" 
      :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.9)), url('${coach.image.url}')`}">
    </div>
    <div class="column">
      <h2 class="mb1">{{ coach.name }}</h2>
      <p class="coach-text m00">{{ coach.description }}</p>
    </div>
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
    padding: 1rem;
  }

  .avatar {
    height: 250px;
    width: 250px;
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