<template>
  <div class="article-page">
    <div class="article-content">
      <h2>{{ article.title }}</h2>
      <div class="article-image" :style="{ backgroundImage: `url('${article.image.url}')`}"></div>
      <div v-html="$md.render(article.text)"></div>
    </div>
  </div>
</template>

<script>
  import getSingleArticle from '~/apollo/queries/getSingleArticle.gql'; 
  
  export default {
    apollo: {
      article: {
        query: getSingleArticle,
        variables() {
          return {
            id: this.$route.params.id,
          }
        }
      }
    }, 
    data() {
      return {
        article: {}
      }
    }
  }
</script>

<style scoped>
  .article-page {
    display: flex;
    justify-content: center;
  }

  .article-content {
    width: 50%;
  }

  .article-image {
    margin-bottom: 1rem;
    background-size: cover;
    background-position: center; 
    height: 40vh;
  }
</style>