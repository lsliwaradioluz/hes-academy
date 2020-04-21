<template>
  <main class="cart-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Koszyk</template>
    </Header>
    <section class="main column" v-if="items.length > 0">
      <h2 class="mt0">Produkty:</h2>
      <p class="mt0">Dodanie produktu do koszyka nie jest równoznaczne z finalizacją zamówienia. Przejdź do kasy, aby zapłacić za swoje zakupy.</p>
      <p class="t-textsecondary fs-12">Produktów w koszyku: {{ items.length }}</p>
      <CartItem 
        v-for="item in items" 
        :key="item.id" 
        :item="item" 
        @delete="removeItem($event)">
      </CartItem>
      <p class="cart-price price fs-24">Razem: {{ price }}zł</p>
      <button class="button-tertiary" @click="goToCheckout">Przejdź do kasy</button>
    </section>
    <section class="main" v-else>
      <h2 class="mt0">Produkty:</h2>
      <p class="mt0">Dodanie produktu do koszyka nie jest równoznaczne z finalizacją zamówienia. Przejdź do kasy, aby zapłacić za swoje zakupy.</p>
      <p class="t-textsecondary fs-12">Twój koszyk jest pusty.</p>
      <nuxt-link class="button-tertiary" to="/programs">Kontynuuj zakupy</nuxt-link>
    </section>
  </main>
</template>

<script>
  import CartItem from '~/components/CartItem.vue';
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    components: { CartItem },
    computed: {
      ...mapGetters({
        items: 'cart/items',
        price: 'cart/price',
        user: 'auth/user'
      })
    },
    methods: {
      ...mapMutations({
        removeItem: 'cart/removeItem', 
        toggleShowAuthentication: 'auth/toggleShowAuthentication'
      }),
      goToCheckout() {
        if (this.user) {
          this.$router.push('/cart/checkout');
        } else {
          this.$router.push({ query: { to: '/cart/checkout' } })
          this.toggleShowAuthentication('login');
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .cart-price {
    border-top: 1px solid color(texttertiary);
    padding-top: 1rem;
    margin: 1rem 0;
  }
</style>


