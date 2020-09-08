<template>
  <div>
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Sklep</template>
    </Header>
    <article class="product-page main">
      <Gallery class="product-page__gallery" :images="product.images" />
      <section class="product-page__details">
        <h2 class="mt0">{{ product.name }}</h2>
        <span class="row j-between">
          <h3>Cena:</h3>
          <h3>{{ product.price }}zł</h3>
        </span>
        <template v-if="product.available">
          <nuxt-link class="button-tertiary" tag="button" type="button" to="/cart" v-if="isItemInCart">Przejdź do koszyka</nuxt-link>
          <button class="button-primary" type="button" @click="addToCart" v-else>Dodaj do koszyka</button>
        </template>
        <template v-else>
          <button class="button-tertiary" type="button" @click="formVisible = true">Zapytaj o dostępność</button>
        </template>
        <Modal :show="formVisible" @close="formVisible = false">
          <div class="form">
            <h2 class="mt0">Zapytaj o dostępnosć</h2>
            <button class="flaticon-delete close-button" type="button" @click="formVisible = false"></button>
            <ContactForm 
              class="mb1"
              ref="form"
              :subject-placeholder="`Zapytanie o produkt ${product.name}`"
              :text-placeholder="formText"
              success-message="Twoje zapytanie zostało wysłane. Odpowiemy na nie najszybciej, jak to możliwe."
              @success="formVisible = false">
            </ContactForm>
          </div>  
        </Modal>
        <h3 class="mt2 mb1">Opis produktu</h3>
        <p v-if="product.description">{{ product.description }}</p>
        <p v-else>Ten produkt nie ma jeszcze opisu.</p>
        <template v-if="product.exercises.length > 0">
          <h3 class="mt1 mb1">Z tym sprzętem wykonasz ćwiczenia:</h3>
          <ul>
            <ExerciseThumb v-for="exercise in product.exercises" :key="exercise.id" :exercise="exercise" />
          </ul>
        </template>
        <div class="related-products column" v-if="products.length > 0">
          <h3>Zobacz także:</h3>
          <ProductThumb v-for="product in products" :key="product.id" :product="product" />
        </div>
      </section>
    </article>
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
    data() {
      return {
        formVisible: false,
      }
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
    }
  }
</script>

<style lang="scss" scoped>

  .product-page__details {
    display: flex;
    flex-direction: column;
  }

  .related-products {
    border-top: 1px solid color(texttertiary);
    padding-top: 1rem;
  }

  .form {
    background-color: white;
    padding: 1rem;
    padding-bottom: 0;
    margin: 0 auto;
    width: 100%;
    position: relative;
    .close-button {
      position: absolute;
      top: 4px;
      right: 4px;
      font-size: 10px;
    }
  }

  @media (min-width: 1024px) {
    .product-page {
      display: flex;
    }

    .product-page__gallery {
      padding-right: 2rem;
      border-right: 1px solid color(texttertiary);
    } 
      section:nth-child(2) {
        padding-left: 2rem;
        flex-basis: 70%;
      } 

    .form {
      width: 50%;
    }
  }
</style>