<template>
  <div class="products-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Sklep</template>
    </Header>
    <section class="main">
      <Product v-for="product in products" :product="product" :key="product.id" />
      <p v-if="products.length == 0">Brak produktów w sklepie.</p>
    </section>
  </div>
</template>

<script>
  import getAllProducts from '~/apollo/queries/getAllProducts.gql';


  export default {
    asyncData(context) {
      let client = context.app.apolloProvider.defaultClient;
      return client.query({ query: getAllProducts })
        .then(({ data }) => {
          return {
            products: data.products,        
          }
        });
    },
  }
</script>

<style lang="scss" scoped>
</style>