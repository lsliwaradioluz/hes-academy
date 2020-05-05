<template>
  <div class="product-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>{{ product.name }}</template>
      <template v-slot:caption>{{ product.price }}zł</template>
    </Header>
    <section class="main">
      <Gallery :images="product.images" />
      <article class="column">
        <h2 class="mt2">{{ product.name }}</h2>
        <span class="row j-between">
          <h3>Cena:</h3>
          <h3>{{ product.price }}zł</h3>
        </span>
        <template v-if="product.available">
          <nuxt-link class="button-tertiary" tag="button" type="button" to="/cart" v-if="isItemInCart">Przejdź do koszyka</nuxt-link>
          <button class="button-primary" type="button" @click="addToCart" v-else>Dodaj do koszyka</button>
        </template>
        <template v-else>
          <button class="button-tertiary" type="button" @click="scrollToForm">Zapytaj o dostępność</button>
        </template>
        <h3 class="mt2 mb1">Opis produktu</h3>
        <p>{{ product.description }}</p>
        <template v-if="!product.available">
          <h3 ref="formTitle">Zapytaj o dostępność</h3>
          <ContactForm 
            class="mb1"
            ref="form"
            :subject-placeholder="`Zapytanie o produkt ${product.name}`"
            :text-placeholder="formText"
            success-message="Twoje zapytanie zostało wysłane. Odpowiemy na nie najszybciej, jak to możliwe.">
          </ContactForm>
        </template>
      </article>
      <article class="related-products column" v-if="products.length > 0">
        <h3>Zobacz także:</h3>
        <ProductThumb v-for="product in products" :key="product.id" :product="product" />
      </article>
    </section>
  </div>
</template>

<script>
  import getSingleProduct from '~/apollo/queries/getSingleProduct.gql';
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    asyncData(context) {
      let client = context.app.apolloProvider.defaultClient;
      return client.query({ query: getSingleProduct, variables: { id: context.route.params.id } })
        .then(({ data }) => {
          return {
            product: data.product, 
            products: data.products,
          }
        });
    },
    computed: {
      ...mapGetters({
        items: 'cart/items', 
        user: 'auth/user',
        programs: 'auth/programs',
      }),
      formText() {
        return `Witam, chciałbym zapytać o dostępność produktu ${this.product.name}. Ile sztuk macie na stanie i jaki jest czas realizacji zamówienia?`       
      },
      isItemInCart() {
        const record = this.items.find(item => item.id === this.product.id);
        return Boolean(record);
      },
      productForCart() {
        const productForCart = {
          id: this.product.id,
          name: this.product.name, 
          type: 'product',
          description: this.product.description,
          price: this.product.price, 
          image: this.product.images[0],
          quantity: 1,
        }

        return productForCart;
      }
    }, 
    methods: {
      ...mapMutations({
        addItem: 'cart/addItem', 
        setNotification: 'utils/setNotification',
      }),
      addToCart() {
        this.addItem(this.productForCart);
        this.setNotification('Dodano produkt do koszyka');
      },
      scrollToForm() {
        this.$refs.formTitle.scrollIntoView({ behavior: 'smooth', block: 'center'});
        setTimeout(() => {
          this.$refs.form.focusInput();
        }, 500);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .button-tertiary {
    padding-top: 0.5rem;
    padding-bottom: .5rem;
  }

  .related-products {
    border-top: 1px solid color(texttertiary);
    padding-top: 1rem;
  }
</style>