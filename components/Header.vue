<template>
  <header 
    class="header row j-center" 
    :class="{ 'header--big': big }"
    :style="{ backgroundImage: backgroundImage }">
    <div class="header-fade"></div>
    <transition name="slide-up" appear> 
      <div class="header-content row j-between a-center">
        <div class="video-wrapper">
          <iframe class="pr2" width="560" height="315" src="https://www.youtube.com/embed/WTw_g8Obhro" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="header-content column j-center a-center">
          <h1 class="header-title" :class="{ 'text--highlighted': highlighted}">
            <slot name="header"></slot>
          </h1>
          <p class="header-text">
            <slot name="caption"></slot>
          </p>
          <button class="header-button" type="button" @click="scrollToBottom"><span class="flaticon-mouse fs-40 t-white"></span></button>
        </div>
      </div> 
    </transition>
    <div class="header-target" ref="target"></div>
  </header>
</template>

<script>
  export default {
    props: {
      background: {
        type: String,
      }, 
      backgroundUrl: {
        type: String, 
      },
      highlighted: {
        type: Boolean, 
        default: () => false,
      }, 
      big: {
        type: Boolean, 
        default: () => false, 
      }
    },
    computed: {
      backgroundImage() {
        return this.background ? 
          'url(' + require(`../assets/images/${this.background}`) + ')' 
          : `url(${this.backgroundUrl})`;
      }
    },
    methods: {
      scrollToBottom() {
        this.$refs.target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    height: 60vh;
    padding: 4rem 1rem 2rem 1rem;
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    position: relative;
    color: white;
  }

  .header--big {
    height: 100vh;
  }

  .header-fade {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
  }

  .header-content {
    z-index: 1;
    text-align: center;
  }

  .video-wrapper {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
  }
  .video-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .header-title {
    text-transform: uppercase;
    text-shadow: 0 0 20px #000;
    font-weight: 400;
    margin: 0;
  }

  .text--highlighted {
    text-shadow: none;
    background-color: color(primary);
    padding: .5rem;
    opacity: .9;
  }

  .header-button {
    animation: float 1s infinite;
  }

  .header-target {
    position: absolute;
    bottom: 0;
  }

  .slide-up-enter-active {
    animation: slide-up 1s;
  }
</style>