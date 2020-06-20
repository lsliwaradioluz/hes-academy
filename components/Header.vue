<template>
  <header 
    class="header main row j-center"
    :style="{ backgroundImage: backgroundImage }">
    <div class="fade"></div>
    <transition name="slide-up" appear>
      <div class="content">
        <h1 class="content-title" :class="{ 'text--highlighted': highlighted}">
          <slot name="header"></slot>
        </h1>
        <p class="content-text">
          <slot name="caption"></slot>
        </p>
        <button class="header-button" type="button" @click="scrollToBottom"><span class="flaticon-mouse fs-40 t-white"></span></button>
      </div>
        <!-- <iframe height="315" :src="video" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen v-if="video"></iframe> -->
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
    min-height: 70vh;
    padding-top: 5rem;
    padding-bottom: 5rem;
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    position: relative;
    color: white;
  }

  .fade {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
  }

  .content {
    z-index: 1;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  iframe {
    width: 100%;
  }

  .content-title {
    text-transform: uppercase;
    text-shadow: 0 0 20px #000;
    font-weight: 400;
    margin: 0;
    font-size: 36px;
  }

  .content-text {
    font-size: 16px;
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

  @media (min-width: 1024px) {

    .content-title {
      font-size: 54px;
    }

    .content-text {
      font-size: 18px;
    }

    iframe {
      width: 70%;
      margin-left: 5%;
    }
  }
</style>