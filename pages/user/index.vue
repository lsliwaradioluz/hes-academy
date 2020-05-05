<template>
  <div class="user-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Panel</template>
    </Header>
    <section class="main">
      <h2 class="mt0">Moje dane</h2>
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
          <Program v-for="program in programs" :program="program" :key="program.id" />
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
      if (!store.getters['auth/user']) redirect('/');
      if (route.query.session_id) store.commit('cart/emptyCart');
    },
    async asyncData(context) {
      let client = context.app.apolloProvider.defaultClient;
      const res = await client.query({ query: getSingleUser, variables: { id: context.store.getters['auth/user'].id } });
      const programs = res.data.user.programs;
      const user = res.data.user;
      user.programs = user.programs.map(program => program.id);
      context.store.commit('auth/setUser', user);
      return {
        programs,        
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