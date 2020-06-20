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
    &::before {
      z-index: -1;
      content: "";
      position: absolute;
      top: 4px;
      left: 4px;
      background-color: color(primary);
      width: 100%;
      height: 100%;
    }
  }

  .coach-header {
    margin-bottom: 1rem;
  }

  .coach-text {
    font-size: 14px;
    margin: 0;
  }
</style>