<template>
  <div class="checkout-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Kasa</template>
    </Header>
    <section class="main">
      <article class="column">
        <h2 class="mt0">Podsumowanie</h2>
        <p class="mt0">Od dokonania zakupu poniższych produktów dzieli Cię już tylko krok. Jeżeli chcesz wycofać którąś pozycję, wróć do koszyka i dokonaj zmian.</p>
        <p class="t-textsecondary fs-12">Kupujesz produktów: {{ items.length }}</p>
        <CartItem 
          v-for="item in items" 
          :key="item.id" 
          :item="item">
        </CartItem>
        <p class="checkout-price price fs-20 mb0">Razem: {{ price }}zł</p>
        <p>Przycisk "Finalizuj płatność" przeniesie Cię do formularza płatności.</p>
        <button class="button-primary mt1" type="button" @click="payForOrder">Finalizuj płatność</button>
      </article>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    middleware: 'redirect',
    data() {
      return {
        client: this.$apollo.getClient(),
        complete: false,
        stripeKey: process.env.STRIPE_KEY,
        payWithNewCard: false,
      }
    },
    computed: {
      ...mapGetters({
        items: 'cart/items',
        programs: 'cart/programs',
        products: 'cart/products',
        price: 'cart/price',
        user: 'auth/user',
      }),
      lineItems() {
        const lineItems = [];
        this.items.forEach(item => {
          lineItems.push({
            name: item.name,
            images: [item.image.url],
            amount: item.price * 100, 
            currency: 'pln',
            quantity: item.quantity,
          });
        });

        return lineItems;
      }, 
      metadata() {
        let metadata;
        if (this.programs.length > 0) {
          const programsIDs = this.programs.map(program => program.id);
          const allPrograms = [...programsIDs, ...this.user.programs];
          metadata = {
            user: this.user.id, 
            ...allPrograms
          }
        }
        return metadata;
      },
    },
    methods: {
      ...mapMutations({
        emptyCart: 'cart/emptyCart',
        pushOrder: 'auth/pushOrder',
        setNotification: 'utils/setNotification',
      }),
      async payForOrder() {
        const data = {
          customer: this.user.stripeID,
          payment_method_types: ['card'],
          metadata: this.metadata,
          billing_address_collection: this.products.length > 0 ? 'required' : 'auto',
          line_items: this.lineItems,
          success_url: `http://localhost:3000/user?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: 'http://localhost:3000/cart/checkout',
        };

        try {
          const checkoutSession = await this.$axios.post('http://localhost:1337/users/checkout', data);
          const sessionId = checkoutSession.data.id;
          await this.stripe.redirectToCheckout({ sessionId });
        } catch (err) {
          console.log(err);
          this.setNotification('Coś poszło nie tak. Spróbuj jeszcze raz');
        }
      }
    },
    mounted() {
      this.stripe = Stripe(process.env.STRIPE_KEY);
    }
  }
</script>

<style lang="scss" scoped>
  .checkout-price {
    border-bottom: 1px solid color(texttertiary);
  }
</style>

