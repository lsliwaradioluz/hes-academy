<template>
  <div class="opinion column">
    <div class="avatar" :style="{ backgroundImage: `url('${opinion.image.url}')`}"></div>
    <h3>{{ opinion.name }}</h3>
    <p>{{ opinion.quote }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      opinion: {
        type: Object, 
        required: true, 
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .opinion {
    border: 2px solid color(primary);
    position: relative;
    padding: 1rem;
    padding-top: 0;
    &::after {
      content: "";
      position: absolute;
      top: -3px;
      left: 10px;
      height: 4px;
      width: 100px;
      background-color: color(white);
    }
  }

  h3 {
    margin-top: 1rem;
    margin-bottom: 0;
    text-align: left;
  }

  .avatar {
    z-index: 2;
    margin-top: -40px;
  }

</style>