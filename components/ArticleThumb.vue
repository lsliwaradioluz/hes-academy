<template>
  <div 
    class="article column j-end" 
    :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.9)), url('${article.image.url}')`}">
    <div class="article-content">
      <h3>{{ article.title }}</h3>
      <p class="m00">{{ article.text | previewText }}</p>
      <div class="row j-between a-end">
        <nuxt-link class="button-primary" :to="`/articles/${article.id}`">Czytaj</nuxt-link>
        <p class="m00 fs-12 t-textsecondary">{{ article.createdAt | getDate }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      article: {
        type: Object, 
        required: true, 
      },
    }
  }
</script>

<style lang="scss" scoped>
  .article {
    background-size: cover;
    background-position: center;
    overflow: hidden;
    min-height: 350px;
    color: white;
    padding: 1rem;
    h3 {
      margin-bottom: 0.5rem;
    }
  }

  a {
    margin-top: 1rem;
    padding: .5rem 1rem;
    border-radius: 0;
  }
</style>