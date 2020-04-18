<template>
  <div class="articles-page">
    <div class="articles">
      <Article v-for="article in articles" :key="article.id" :article="article" />
    </div>
  </div>
</template>

<script>
  import getAllArticles from '~/apollo/queries/getAllArticles.gql';
  
  export default {
    apollo: {
      articles: {
        query: getAllArticles
      }
    }, 
    data() {
      return {
        articles: [],
      }
    }
  }
</script>

<style scoped>
  .articles {
    display: flex;
  }
</style>