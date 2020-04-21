<template>
  <div class="user-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Panel</template>
    </Header>
    <div class="main">
      <h2 class="mt0">Moje dane</h2>
      <UserForm 
        :button="{ text: 'Zapisz', class: 'tertiary' }"
        :user="user"
        @submit="updateUser($event)">
      </UserForm>
      <h2 class="mb0 mt2">Moje programy</h2>
      <div class="programs">
        <Program v-for="program in programs" :program="program" :key="program.id" />
      </div>
      <p v-if="programs.length == 0">Na razie nie wykupiłeś dostępu do żadnego z programów. </p>
      <nuxt-link class="button-tertiary pt05 pb05" to="/programs">Napraw ten błąd</nuxt-link>
    </div>
  </div>
</template>

<script>
  import updateUser from '~/apollo/mutations/updateUser.gql';

  export default {
    data() {
      return {
        client: this.$apollo.getClient(),
      }
    },
    computed: {
      user() {
        return this.$store.getters['auth/user'];
      },
      programs() {
        return this.$store.getters['auth/programs'];
      }
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
    }
  }
</script>

<style scoped>

  .programs {
    display: flex; 
  }

  .error {
    font-size: 11px;
    color: red;
    text-align: center;
  }
</style>