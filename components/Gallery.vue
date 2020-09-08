<template>
  <section class="gallery">
    <transition name="fade" mode="out-in">
      <img 
        class="gallery__image" 
        :src="images[current].url"
        :key="current">
    </transition>
    <ul class="gallery__thumbs">
      <li 
        class="gallery__thumb"
        :class="{ active: current == index}"
        :style="{ backgroundImage: `url('${image.url}')` }"
        v-for="(image, index) in images" 
        :key="image.id"
        @click="current = index">
      </li>
    </ul>
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

  .gallery {
    margin-bottom: 2rem;
    flex-basis: 50%;
    flex-shrink: 0;
  }

  .gallery__image {
    width: 100%;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .gallery__thumbs {
    display: flex;
    width: 100%;
    overflow-x: auto;
    &::-webkit-scrollbar {
      height: 10px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
      background: color(primary);
    }
    &::-webkit-scrollbar-thumb:hover {
      opacity: 0.8;
    }
  }

  .gallery__thumb {
    height: 150px;
    cursor: pointer;
    background-size: cover;
    background-position: center;
    flex-basis: 30%;
    flex-grow: 1;
    flex-shrink: 0;
    &:before {
      display: none;
    }
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