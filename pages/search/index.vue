<template>
  <div class="search-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Wyszukiwarka</template>
      <template v-slot:caption>Wyniki wyszukiwania dla frazy '{{ $route.query.search }}'</template>
    </Header>
    <article class="main">
      <p v-if="noSearchResults">Nie znaleziono żadnych wyników dla podanego zapytania.</p>
      <section class="articles" v-if="filteredArticles.length > 0">
        <h2>Znalezione artykuły ({{ filteredArticles.length }})</h2>
        <ul class="articles__list">
          <Article v-for="article in filteredArticles" :key="article.id" :article="article" />
        </ul>
      </section>
      <section class="products" v-if="filteredProducts.length > 0">
        <h2>Znalezione produkty ({{ filteredProducts.length }})</h2>
        <ul class="products__list">
          <Product v-for="product in filteredProducts" :product="product" :key="product.id" />
        </ul>
      </section>
      <section class="programs" v-if="filteredPrograms.length > 0">
        <h2>Znalezione szkolenia ({{ filteredPrograms.length }})</h2>
        <ul class="programs__list">
          <Program v-for="program in filteredPrograms" :key="program.id" :program="program" />
        </ul>
      </section>
    </article>
  </div>
</template>

<script>
  import getAllArticles from '~/apollo/queries/getAllArticles.gql'
  import getAllProducts from '~/apollo/queries/getAllProducts.gql'
  import getAllPrograms from '~/apollo/queries/getAllPrograms.gql'

  export default {
    async asyncData(context) {
      let client = context.app.apolloProvider.defaultClient;
      const { data: articlesData } = await client.query({ query: getAllArticles })
      const { data: productsData } = await client.query({ query: getAllProducts })
      const { data: programsData } = await client.query({ query: getAllPrograms })
      
      return {
        articles: articlesData.articles,
        products: productsData.products,
        programs: programsData.programs,
      }
    },
    computed: {
      search() {
        return this.$route.query.search.escapeDiacritics().toLowerCase()
      },
      noSearchResults() {
        if (this.filteredArticles.length + this.filteredProducts.length + this.filteredPrograms.length == 0) {
          return true
        } else {
          return false
        }
      },
      filteredArticles() {
        return this.articles.filter(article => {
          const normalizedTitle = article.title.escapeDiacritics().toLowerCase()
          const normalizedText = article.text.escapeDiacritics().toLowerCase()
          return normalizedTitle.includes(this.search) || normalizedText.includes(this.search)
        })
      },
      filteredProducts() {
        return this.products.filter(product => {
          const normalizedName = product.name.escapeDiacritics().toLowerCase()
          const normalizedDescription = product.description.escapeDiacritics().toLowerCase()
          return normalizedName.includes(this.search) || normalizedDescription.includes(this.search)
        })
      },
      filteredPrograms() {
        return this.programs.filter(program => {
          const normalizedName = program.name.escapeDiacritics().toLowerCase()
          const normalizedDescription = program.description.escapeDiacritics().toLowerCase()
          return normalizedName.includes(this.search) || normalizedDescription.includes(this.search)
        })
      }, 
    },
  }
</script>

<style lang="scss" scoped>

  .articles__list,
  .products__list,
  .programs__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
