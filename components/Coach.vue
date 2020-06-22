<template>
  <div class="coach">
    <div
      class="coach__avatar"
      :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.9)), url('${coach.image.url}')`}">
    </div>
    <div class="column">
      <h2 class="coach-header">{{ coach.name }}</h2>
      <p class="coach-text">{{ coach.description }}</p>
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
    display: flex;
    flex-direction: column;
  }

  .coach__avatar {
    height: 450px;
    width: 250px;
    background-position: center;
    background-size: cover;
    position: relative;
    box-shadow: 5px 5px 0 color(primary);
  }

  .coach-header {
    margin-bottom: 1rem;
  }

  .coach-text {
    font-size: 14px;
    margin: 0;
  }
</style>