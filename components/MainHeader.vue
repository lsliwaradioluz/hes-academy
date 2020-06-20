<template>
  <header class="header">
    <div class="header__navigation" ref="navigation">
      <button
        class="header__navigation-button"
        :class="{ 'button--active': index == current }"
        type="button"
        v-for="(slide, index) in slides"
        :key="slide.id"
        @click="changeSlide(index)"
      ></button>
    </div>
    <transition name="fade" mode="out-in">
      <div class="content-wrapper" :key="current">
        <div class="content">
          <h1 class="content-title">
            {{ currentSlide.header }}
          </h1>
          <p class="content-text">
            {{ currentSlide.subheader }}
          </p>
          <button class="button-tertiary p12" type="button" @click="scrollToBottom">
            Poznaj Hes Academy
          </button>
        </div>
        <div class="player"> 
          <iframe
            :src="currentSlide.video"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </transition>
    <div class="header__target" ref="target">
    </div>
  </header>
</template>

<script>
export default {
  props: {
    slides: {
      type: Array
    }
  },
  data() {
    return {
      current: 0,
      sliderInterval: null,
    };
  },
  computed: {
    backgroundImage() {
      return this.background
        ? "url(" + require(`../assets/images/${this.background}`) + ")"
        : `url(${this.backgroundUrl})`;
    },
    currentSlide() {
      return this.slides[this.current];
    }
  },
  methods: {
    scrollToBottom() {
      this.$refs.target.scrollIntoView({ behavior: "smooth" });
    }, 
    changeSlide(index) {
      this.current = index;
      this.clearSliderInterval();
    },
    runSlider() {
      const intervalTime = 2000;
      this.sliderInterval = setInterval(() => {
        if (this.current < this.slides.length - 1) {
          this.current++
        } else {
          this.current = 0
        }
      }, intervalTime);
    }, 
    clearSliderInterval() {
      clearInterval(this.sliderInterval);
      this.sliderInterval = null;
    }
  }, 
  mounted() {
    // this.runSlider();
  }
};
</script>

<style lang="scss" scoped>
.header {
  padding: 4rem 0 0 0;
  min-height: 100vh;
  background-color: black;
  position: relative;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.content {
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 1rem;
}

.player {
  position: relative;
  width: 100%;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 3rem;
    width: 100%;
    background-color: black;
    z-index: 3;
  }
}

iframe {
  min-height: 300px;
  height: 100%;
  width: 100%;
  z-index: 1;
}

.content-title {
  text-transform: uppercase;
  text-shadow: 0 0 20px #000;
  font-weight: 400;
  margin: 0;
  font-size: 30px;
}

.content-text {
  font-size: 14px;
}

.header__navigation {
  padding: 1rem;
}

.header__navigation-button {
  height: 10px;
  width: 10px;
  border: 2px solid color(primary);
  border-radius: 50%;
  margin: 0 5px;
  transition: background-color 0.3s;
}

.button--active {
  background-color: color(primary);
}

.header__target {
  position: absolute;
  bottom: 0;
}

@media (min-width: 768px) {
  .header {
    padding: 4.5rem 5%;
  }

  .content {
    padding: 0;
  }

  .header__navigation {
   padding-left: 0;
  }
}

@media (min-width: 1024px) {

  .content-wrapper {
    display: flex;
  } 

  .content {
    padding-left: 0;
    padding-right: 2rem;
  }

  .content-title {
    font-size: 64px;
  }

  .content-text {
    font-size: 16px;
  }

  .player::after {
    display: none;
  }
}

@media (min-width: 1200px) {
  .header {
    padding: 4.5rem 10%;
  }
}
</style>
