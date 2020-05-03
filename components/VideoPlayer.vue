<template>
  <div class="video-player">
    <iframe 
      :src="src"
      frameborder="0"
      allow="autoplay; fullscreen" 
      allowfullscreen>
    </iframe>  
  </div>
</template>

<script>
  export default {
    props: {
      src: {
        type: String, 
        required: true, 
      }
    },
  }
</script>

<style lang="scss" scoped>

  .video-player {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>