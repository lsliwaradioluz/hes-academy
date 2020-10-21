<template>
  <div class="articles-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Blog</template>
      <template v-slot:caption v-if="filter"
        >powiązane z: {{ filter }}</template
      >
    </Header>
    <section class="main">
      <article class="tags row" :class="{ 'tags--visible': tagsVisible }">
        <nuxt-link
          class="button-tertiary article-tag"
          :to="{ path: '/articles' }"
        >
          WSZYSTKIE
        </nuxt-link>
        <nuxt-link
          class="article-tag"
          v-for="tag in tags"
          :key="tag.id"
          :to="{ path: '/articles', query: { tag: tag.name } }"
        >
          {{ tag.name }}
        </nuxt-link>
      </article>
      <article class="articles">
        <Article
          v-for="article in filteredArticles"
          :key="article.id"
          :article="article"
        />
        <p v-if="filteredArticles.length === 0">
          Brak artykułów powiązanych ze wskazaną frazą.
        </p>
      </article>
    </section>
  </div>
</template>

<script>
import getAllArticles from "~/apollo/queries/getAllArticles.gql";

export default {
  asyncData(context) {
    let client = context.app.apolloProvider.defaultClient;
    return client.query({ query: getAllArticles }).then(({ data }) => {
      return {
        articles: data.articles,
        tags: data.tags
      };
    });
  },
  data() {
    return {
      tagsVisible: false
    };
  },
  computed: {
    filter() {
      return this.$route.query.tag;
    },
    filteredArticles() {
      if (this.filter) {
        return this.articles.filter(article => {
          const record = article.tags.find(tag => {
            return tag.name == this.filter;
          });
          return record;
        });
      } else {
        return this.articles;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tags {
  padding-bottom: 1rem;
  overflow: scroll;
  position: relative;
  transition: max-height 1s;
  a {
    font-size: 12px;
    padding: 8px;
    margin-right: 0.5rem;
    margin-bottom: 0;
    white-space: nowrap;
  }
  &::-webkit-scrollbar {
    display: none;
  }
}

@media (min-width: 1024px) {
  section {
    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
    h2 {
      display: none;
    }
  }

  .tags {
    border-left: 1px solid color(texttertiary);
    padding-left: 2rem;
    max-height: initial;
    flex-basis: 30%;
    position: sticky;
    top: 5rem;
    flex-wrap: wrap;
    a {
      margin-bottom: .5rem;
    }
  }

  .articles {
    padding-right: 2rem;
    flex-basis: 70%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .article {
    flex-basis: 49%;
  }
}
</style>
