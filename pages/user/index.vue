<template>
  <div class="user-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Panel</template>
    </Header>
    <section class="main">
      <h2 class="mt0">Moje dane</h2>
      <article>
        <h3>Dane płatnicze</h3>
        <template v-if="user.paymentMethod">
          <p>Do tego konta przypisano kartę {{ user.paymentMethod.card.brand }} kończącą się na {{ user.paymentMethod.card.last4 }}</p>
          <button class="button-tertiary" type="button" @click="updateSubscription">Zmień kartę</button>
        </template>
        <template v-else>
          <p>To konto nie ma aktywnej subskrypcji, więc nie ma przypisanej żadnej karty.</p>
        </template>
      </article>
      <article>
        <h3>Subskrypcja</h3>
        <template v-if="!user.subscription">
          <p>Twoja subskrypcja serwisu HES Academy jest wyłączona</p>
          <button class="button-tertiary" type="button" @click="createSubscription">Włącz</button>
        </template>
        <template v-else>
          <p>Twoja subskrypcja serwisu HES Academy jest włączona.</p>
          <button class="button-tertiary" type="button" @click="deleteSubscription">Wyłącz</button>
        </template>
      </article>
      <article>
        <h3>Dane ogólne</h3>
        <UserForm 
          :button="{ text: 'Zapisz', class: 'tertiary' }"
          :user="user"
          @submit="updateUser($event)">
        </UserForm>
      </article>
      <article>
        <h2 class="mt2">Moje programy</h2>
        <div class="programs" v-if="user.programs.length > 0">
          <p class="mt0">Poniżej znajduje się lista wykupionych przez Ciebie programów HES Academy. Pamiętaj, że masz do nich dożywotni dostęp.</p>
          <Program v-for="program in user.programs" :program="program" :key="program.id" />
        </div>
        <div v-else>
          <p>Na razie nie wykupiłeś dostępu do żadnego z programów. </p>
          <nuxt-link class="button-tertiary" to="/programs">Napraw ten błąd</nuxt-link>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
  import updateUser from '~/apollo/mutations/updateUser.gql';
  import getSingleUser from '~/apollo/queries/getSingleUser.gql';

  export default {
    async middleware ({ store, redirect, route, app }) {
      if (!store.getters['auth/user']) {
        redirect('/');
      }

      if (route.query.session_id) {
        const client = app.apolloProvider.defaultClient;
        const response = await client.query({ query: getSingleUser, variables: { id: store.getters['auth/user'].id } });
        store.commit('auth/setUser', response.data.user);
        store.commit('cart/emptyCart');
      }
    },
    data() {
      return {
        client: this.$apollo.getClient(),
        showCardEdit: false,
        stripe: null,
      }
    },
    computed: {
      user() {
        return this.$store.getters['auth/user'];
      },
    },
    methods: {
      async createSubscription() {
        const data = {
          customer: this.user.stripeID,
          payment_method_types: ['card'],
          subscription_data: {
            items: [{
              plan: 'plan_H8x92sfsndJpvg',
            }],
          },
          metadata: {
            user: this.user.id,
          },
          success_url: `http://localhost:3000/user?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: 'http://localhost:3000/user',
        };
        try {
          const checkoutSession = await this.$axios.post('http://localhost:1337/users/checkout', data);
          const sessionId = checkoutSession.data.id;
          await this.stripe.redirectToCheckout({ sessionId });
        } catch (err) {
          console.log(err);
          this.$store.commit('utils/setNotification', 'Coś poszło nie tak. Spróbuj jeszcze raz');
        }
      },
      async deleteSubscription() {
        try {
          const response = await this.$axios.post(`http://localhost:1337/users/deletesubscription`, this.user);
          const updatedUser = response.data;
          this.$store.commit('auth/setUser', updatedUser);
          this.$store.commit('utils/setNotification', 'Twoja subskrybcja została wyłączona');
        } catch (err) {
          console.log(err);
          this.$store.commit('utils/setNotification', 'Coś poszło nie tak. Spróbuj jeszcze raz');
        }
      },
      async updateSubscription() {
        const data = {
          customer: this.user.stripeID,
          payment_method_types: ['card'],
          mode: 'setup',
          metadata: {
            user: this.user.id,
          },
          setup_intent_data: {
            metadata: {
              customer_id: this.user.stripeID,
              subscription_id: this.user.subscription.id,
            },
          },
          success_url: `http://localhost:3000/user?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: 'http://localhost:3000/user',
        }
        try {
          const checkoutSession = await this.$axios.post(`http://localhost:1337/users/checkout`, data);
          const sessionId = checkoutSession.data.id;
          await this.stripe.redirectToCheckout({ sessionId });
        } catch (err) {
          console.log(err);
          this.$store.commit('utils/setNotification', 'Coś poszło nie tak. Spróbuj jeszcze raz');
        }
      },
      updateUser(user) {
        this.$nuxt.$loading.start();
        const input = {
          where: {
            id: this.user.id
          }, 
          data: {
            ...user
          }
        }

        this.client.mutate({ mutation: updateUser, variables: { input } })
          .then(res => {
            const updatedUser = res.data.updateUser.user;
            this.$store.commit('auth/setUser', updatedUser);
            this.$store.commit('utils/setNotification', 'Zmiany zostały zapisane');
            this.$nuxt.$loading.finish();
          })
          .catch(err => {
            this.$store.commit('utils/setNotification', 'Coś poszło nie tak. Spróbuj jeszcze raz');
            this.$nuxt.$loading.finish();
          });
      }
    },
    mounted() {
      this.stripe = Stripe(process.env.STRIPE_KEY);
    }
  }
</script>

<style scoped>

  article {
    margin-bottom: 2rem;
  }

  .button-tertiary {
    padding: .5rem 1rem;
  }
</style>