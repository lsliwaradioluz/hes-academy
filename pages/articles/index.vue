<template>
  <div class="articles-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Blog</template>
      <template v-slot:caption v-if="filter">powiązane z: {{ filter }}</template>
    </Header>
    <section class="articles column">
      <Article v-for="article in filteredArticles" :key="article.id" :article="article" />
    </section>
  </div>
</template>

<script>
  import getAllArticles from '~/apollo/queries/getAllArticles.gql';
  
  export default {
    asyncData(context) {
      let client = context.app.apolloProvider.defaultClient;
      return client.query({ query: getAllArticles })
        .then(({ data }) => {
          return {
            articles: data.articles,        
          }
        });
    },
    data() {
      return {
        filter: this.$route.query.tag, 
      }
    },
    computed: {
      filteredArticles() {
        if (this.filter) {
          return this.articles.filter(article => {
            const record = article.tags.find(tag => {
              return tag.name == this.filter;
            });
            return record
          });
        } else {
          return this.articles;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .articles {
    padding: 3rem 1rem;
  }

  .article {
    margin-bottom: 1rem;
  }
</style>