<template>
  <div class="products-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Sklep</template>
    </Header>
    <section class="main column a-center">
      <article class="description">
        <h2 class="header--underlined">Wszystko, czego Ci trzeba</h2>
        <p>Skromny sklep HES Academy wyposażony jest w najbardziej potrzebny sprzęt do ćwiczeń. Znajdziesz tu przyrządy wykorzystywane w ćwiczeniach obecnych w naszej bazie. Wykonany z najwyższej jakości materiałów, którego jakość gwarantowana jest przez firmę HES.</p>
        <p class="t-textsecondary mb2">Wszystkich produktów: {{ products.length }}</p>
      </article>
      <article class="products">
        <Product v-for="product in products" :product="product" :key="product.id" />
        <p v-if="products.length == 0">Brak produktów w sklepie.</p>
      </article>
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
  
  .description {
    h2, p {
      margin-top: 0;
      max-width: 500px;
      text-align: center;
    }
  }

  .products {
    width: 100%;
  }

  @media (min-width: 1024px) {
    .products {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    .product {
      flex-basis: 30%;
    }
  }
</style>