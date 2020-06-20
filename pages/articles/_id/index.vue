<template>
  <div class="article-page" v-if="!$apollo.loading">
    <Header :background-url="article.image.url">
      <template v-slot:header>{{ article.title }}</template>
      <template v-slot:caption>{{ article.author }}</template>
    </Header>
    <section class="p11">
      <article>
        <p class="t-textsecondary fs-12">Dodano {{ article.createdAt | getDate }}</p>
        <div class="article-tags row">
          <nuxt-link 
            class="article-tag" 
            v-for="tag in article.tags" 
            :key="tag.id" 
            :to="{ path: '/articles', query: { tag: tag.name }}">
            {{ tag.name }}
          </nuxt-link>
        </div>
        <div class="content" v-html="$md.render(article.text)"></div>
      </article>
      <article class="related-articles column">
        <h3>Przeczytaj także:</h3>
        <ArticleThumb v-for="article in articles" :key="article.id" :article="article" />
      </article>
    </section>
  </div>
</template>

<script>
  import getSingleArticle from '~/apollo/queries/getSingleArticle.gql'; 
  import getAllArticles from '~/apollo/queries/getAllArticles.gql'; 
  
  export default {
    async asyncData(context) {
      let client = context.app.apolloProvider.defaultClient;
      const article = await client.query({ query: getSingleArticle, variables: { id: context.route.params.id } });
      const articles = await client.query({ query: getAllArticles, variables: { limit: 3 } });
      return {
        article: article.data.article, 
        articles: articles.data.articles, 
      }
    },
  }
</script>

<style lang="scss" scoped>
  .article-tags {
    flex-wrap: wrap;
  }

  .content {
    border-bottom: 1px solid color(texttertiary);
  }

  .related-articles {
    padding-top: 1rem;
  }

  @media (min-width: 1024px) {
    section {
      padding: 4.5rem 10% !important;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      article {
        &:nth-child(1) {
          padding-right: 2rem;
          flex-basis: 70%;
          border-right: 1px solid color(texttertiary);
        }
        &:nth-child(2) {
          padding-left: 2rem;
          flex-basis: 30%;
        }
      }
    }

    .content {
      border-bottom: none;
    }

    .related-articles {
      position: sticky;
      top: 4rem;
    }
  }
</style>