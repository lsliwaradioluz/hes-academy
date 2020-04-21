<template>
  <div class="article-page" v-if="!$apollo.loading">
    <Header :background-url="article.image.url">
      <template v-slot:header>{{ article.title }}</template>
    </Header>
    <section class="article-page-content">
      <p class="t-textsecondary fs-12">Dodano {{ article.createdAt | getDate }}</p>
      <div class="article-tags row">
        <nuxt-link 
          class="button-primary" 
          v-for="tag in article.tags" 
          :key="tag.id" 
          :to="{ path: '/articles', query: { tag: tag.name }}">{{ tag.name }}</nuxt-link>
      </div>
      <div v-html="$md.render(article.text)"></div>
      <div class="article-page-related column">
        <h3>Przeczytaj także:</h3>
        <ArticleThumb v-for="article in articles" :key="article.id" :article="article" />
      </div>
    </section>
  </div>
</template>

<script>
  import getSingleArticle from '~/apollo/queries/getSingleArticle.gql'; 
  import getAllArticles from '~/apollo/queries/getAllArticles.gql'; 
  
  export default {
    apollo: {
      article: {
        query: getSingleArticle,
        variables() {
          return {
            id: this.$route.params.id,
          }
        }
      }, 
      articles: {
        query: getAllArticles, 
        variables() {
          return {
            limit: 4
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

<style lang="scss" scoped>

  .article-tags {
    flex-wrap: wrap;
    a {
      font-size: 12px;
      padding: 8px;
      border-radius: 0;
      margin-right: .5rem;
      margin-bottom: .5rem;
    }
  }

  .article-page-content {
    padding: 1rem;
  }

  .article-page-related {
    border-top: 1px solid color(texttertiary);
    padding-top: 1rem;
  }
</style>