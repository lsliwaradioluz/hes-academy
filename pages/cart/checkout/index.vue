<template>
  <div class="checkout-page">
    <h2>Wybrane produkty:</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        <p>{{ item.nazwa }}</p>
        <p>{{ item.cena }}zł</p>
        <p>Razem: {{ price }}zł</p>
      </li>
    </ul>
    <form @submit.stop.prevent="handleSubmit">
      <fieldset>
        <div class="uk-margin">
          <label for="card">Karta</label>
            <card
              ref="card-stripe"
              :stripe="stripeKey"
              @change='complete = $event.complete'
            />
        </div>
        <button type="submit">Finalizuj płatność</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import { Card, createToken } from 'vue-stripe-elements-plus';
  import createOrder from '~/apollo/mutations/createOrder.gql';   

  export default {
    middleware: 'redirect',
    components: {
      Card,
    },
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

