<template>
  <div class="checkout-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Kasa</template>
    </Header>
    <section class="main">
      <h2 class="mt0">Podsumowanie</h2>
      <p class="mt0">Od dokonania zakupu poniższych produktów dzieli Cię już tylko krok. Jeżeli chcesz wycofać którąś pozycję, wróć do koszyka i dokonaj zmian.</p>
      <p class="t-textsecondary fs-12">Kupujesz produktów: {{ items.length }}</p>
      <CartItem 
        v-for="item in items" 
        :key="item.id" 
        :item="item" 
        @delete="removeItem($event)"
        :show-delete-button="false">
      </CartItem>
      <p class="checkout-price price fs-20">Razem: {{ price }}zł</p>
      <h2>Dane do zamówienia</h2>
      <p>Uzupełnij dane aktywnej karty płatniczej, z której ma zostać pobrana kwota {{ price }}zł. Pamiętaj, aby podać jej numer, termin ważności oraz kod CVV.</p>
      <form class="column" @submit.stop.prevent="handleSubmit">
      <card
        ref="card-stripe"
        :stripe="stripeKey"
        @change='complete = $event.complete'>
      </card>
      <button class="button-primary mt1" type="submit">Finalizuj płatność</button>
      </form>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import { Card, createToken } from 'vue-stripe-elements-plus';
  import createOrder from '~/apollo/mutations/createOrder.gql';  
  import CartItem from '~/components/CartItem.vue';

  export default {
    components: {
      Card,
      CartItem,
    },
    middleware: 'redirect',
    data() {
      return {
        client: this.$apollo.getClient(),
        complete: false,
        loading: false,
        stripeKey: process.env.STRIPE_KEY,
      }
    },
    computed: {
      ...mapGetters({
        items: 'cart/items',
        price: 'cart/price',
        user: 'auth/user',
      }),
    },
    methods: {
      ...mapMutations({
        emptyCart: 'cart/emptyCart',
        pushOrder: 'auth/pushOrder',
      }),
      async handleSubmit() {
        this.loading = true
        let token
        try {
          const response = await createToken()
          token = response.token.id;
        } catch (err) {
          console.log(err);
          this.loading = false
          return
        }
        try {
          const { data } = await this.client.mutate({ 
            mutation: createOrder, 
            variables: { 
              input: {
                data: {
                  user: this.user.id,
                  amount: this.price,
                  products: this.items,
                  token,
                }
              } 
            }, 
          })
          alert('Your order have been successfully submitted.');
          this.pushOrder(data.createOrder.order);
          this.emptyCart();
          this.$router.push('/user');
        } catch (err) {
          this.loading = false
          console.log(err);
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  .checkout-price {
    border-bottom: 1px solid color(texttertiary);
  }
</style>

