<template>
  <div class="article">
    <div class="article-image" :style="{ backgroundImage: `url('${article.image.url}')`}"></div>
    <div class="article-content">
      <h2>{{ article.title }}</h2>
      <div class="article-text">{{ article.text | previewText }}</div>
      <nuxt-link :to="`/articles/${article.id}`">Czytaj</nuxt-link>
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

<style scoped>
  .article {
    flex-basis: 30%;
    flex-grow: 0;
    border: 1px solid black;
    border-radius: 6px;
    overflow: hidden;
  }

  .article-image {
    background-size: cover;
    background-position: center;
    height: 150px;
    width: 100%;
  } 

  .article-content {
    padding: 1rem;
  }

  .article-content h2 {
    margin-top: 0;
  }

  .article-content a {
    padding: 0.5rem; 
    background-color: lightgoldenrodyellow;
  }

  .article-text {
    margin-bottom: 1.5rem;
  }
</style>