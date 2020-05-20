<template>
  <section class="gallery mb2">
    <transition name="fade" mode="out-in">
      <div 
        class="main-image" 
        :style="{ backgroundImage: `url('${images[current].url}')`}"
        :key="current">
      </div>
    </transition>
    <Carousel :pagination="false" :columns="[[1, 3]]">
      <div 
        class="thumb row a-center j-center"
        :class="{ active: current == index}"
        v-for="(image, index) in images" 
        :key="image.id">
        <img
          :src="image.url" 
          :alt="`image-${image.id}`"
          @click="current = index">
      </div>
    </Carousel>
  </section>
</template>

<script>
  export default {
    props: {
      images: {
        type: Array, 
        required: true, 
      }
    },
    data() {
      return {
        current: 0,
      }
    }
  }
</script>

<style lang="scss" scoped>

  .main-image {
    height: 300px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .thumb {
    cursor: pointer;
  }

  .active {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      height: 2px;
      width: 100%;
      background-color: color(primary);
    }
  }
</style>