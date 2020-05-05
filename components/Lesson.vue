<template>
  <nuxt-link 
    class="lesson row" 
    :class="{ locked: locked }" 
    tag="div" 
    :to="{ query: { lesson: lessonIndex }}"
    :event="locked ? '' : 'click'">
    <div
      class="lesson-image avatar"
      :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.9)), url('${img}')`}">
      <span class="lesson-lock-icon flaticon-locked-padlock t-primary fs-14" v-if="locked"></span>
    </div>
    <div class="lesson-content">
      <p class="m00 fs-12 t-textsecondary">Lekcja {{ lessonIndex + 1 }}</p>
      <h4 class="m00">{{ lesson.name }}</h4>
    </div>
  </nuxt-link>
</template>

<script>
  export default {
    props: {
      lesson: {
        type: Object, 
        required: true, 
      }, 
      lessonIndex: {
        type: Number, 
        required: true, 
      }, 
      locked: {
        type: Boolean, 
        default: () => false,
      }, 
      img: {
        type: String, 
        required: true, 
      }
    }
  }
</script>

<style lang="scss" scoped>
.lesson {
    background-size: cover;
    background-position: center;
    overflow: hidden;
    color: white;
    padding: .5rem 0;
    color: black;
  }

  .lesson-image {
    height: 60px;
    width: 60px;
    border: none;
    border-radius: 0;
    flex-shrink: 0;
    margin-right: 5px;
    position: relative;
  }

  .lesson-lock-icon {
    position: absolute;
    left: 2px;
    bottom: 2px;
  }

  a {
    margin-top: 1rem;
    padding: .5rem 1rem;
  }

  .locked {
    opacity: .6;
  }
</style>