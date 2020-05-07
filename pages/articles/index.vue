<template>
  <div class="articles-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Blog</template>
      <template v-slot:caption v-if="filter">powiązane z: {{ filter }}</template>
    </Header>
    <section class="main">
      <h2 class="mt0">Tagi</h2>
      <article 
        class="tags row"
        :class="{ 'tags--visible': tagsVisible }">
        <nuxt-link 
          class="button-tertiary"
          :to="{ path: '/articles' }">
          WSZYSTKIE
        </nuxt-link>
        <nuxt-link 
          class="button-primary" 
          v-for="tag in tags" 
          :key="tag.id" 
          :to="{ path: '/articles', query: { tag: tag.name }}">
          {{ tag.name }}
        </nuxt-link>
      </article>
      <div class="reveal-tags-buttons column">
        <button class="mb2 t-center flaticon-down-chevron" type="button" @click="tagsVisible = true" v-if="!tagsVisible"></button>
        <button class="mb2 t-center flaticon-up-chevron" type="button" @click="tagsVisible = false" v-else></button>
      </div>
      <h2 class="mt0">Wpisy</h2>
      <article class="articles">
        <Article v-for="article in filteredArticles" :key="article.id" :article="article" />
      </article>
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
            tags: data.tags,  
          }
        });
    },
    data() {
      return {
        tagsVisible: false,      
      }
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

  .tags {
    flex-wrap: wrap;
    max-height: 6rem;
    margin-bottom: 1rem;
    overflow: hidden;
    position: relative;
    transition: max-height 1s;
    a {
      font-size: 12px;
      padding: 8px;
      margin-right: .5rem;
      margin-bottom: .5rem;
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1rem;
      background: linear-gradient(rgba(250,250,250,0.2), rgb(250,250,250));
    }
  }

  .tags--visible {
    max-height: 1000px;
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
      padding-left: 2rem;
      max-height: initial;
      flex-basis: 30%;
      position: sticky;
      top: 5rem;
      &::after {
        display: none;
      }
    }

    .reveal-tags-buttons {
      display: none;
    }

    .articles {
      padding-right: 2rem;
      flex-basis: 70%;
      border-right: 1px solid color(texttertiary);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .article {
      flex-basis: 48%;
      &:nth-child(1) {
        flex-basis: 100%;
      }
    }
  }
</style>