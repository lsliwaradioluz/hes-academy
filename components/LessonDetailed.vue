<template>
  <section class="lesson-detailed">
    <button class="return-button flaticon-left-arrow mb1 p00" type="button" @click="$emit('back')"></button>
    <p class="t-textsecondary m00">Wykład {{ lessonIndex + 1 }}</p>
    <h2 class="mt0">{{ lesson.name }}</h2>
    <iframe 
      height="315" 
      :src="lesson.video" 
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
    <p>{{ lesson.description }}</p>
  </section>
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
  },
}
</script>

<style lang="scss" scoped>
  .lesson-detailed {
    border-bottom: 1px solid color(texttertiary);
  }
  
  iframe {
    width: 100%;
  }

  @media (min-width: 1024px) {
    .lesson-detailed {
      border-bottom: none;
    }

    .return-button {
      display: none;
    }
  }
</style>