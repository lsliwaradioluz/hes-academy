<template>
  <div class="lesson">
    <iframe 
      width="560" 
      height="315" 
      :src="lesson.wideo" 
      frameborder="0" 
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
    <div class="program-content">
      <h2>{{ lesson.nazwa }}</h2>
      <p>{{ lesson.opis }}</p>
      <button type="button" @click="$router.go(-1)">Wróć</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lesson: {
      type: Object, 
      required: true, 
    }
  }
}
</script>

<style scoped>

</style>