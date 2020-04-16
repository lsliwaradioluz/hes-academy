<template>
  <div class="login-page">
    <h1>Zaloguj się</h1>
    <form @submit.prevent>
      <input type="text" v-model="identifier" placeholder="email" :spellcheck="false" autocomplete="on">
      <input type="password" v-model="password" placeholder="Hasło" :spellcheck="false" autocomplete="on">
      <button  @click.prevent="signIn" type="button">Zaloguj</button>
      <p class="error">{{ error }}</p>
    </form>      
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return { 
      identifier: '',
      revealPassword: false,
      password: '',
      error: ''
    }
  },
  methods: {
    signIn() {
      const endpoint = process.env.NODE_ENV == 'development' ? 'http://localhost:1337/auth/local' : 'https://hesacademy-backend.herokuapp.com/auth/local';
      this.$axios.$post(endpoint, {
        identifier: this.identifier.toLowerCase(), 
        password: this.password
      })
        .then(res => {
          this.$apolloHelpers.onLogin(res.jwt, undefined, { expires: 7 })
          this.setUser(res.user);
          this.$router.push({
            path: '/'
          });
        })
        .catch(err => {
          this.error = 'Nieprawidłowy login lub hasło';
        })
    },
    ...mapMutations({
      setUser: 'auth/setUser',
      logout: 'auth/logout',
    }),
  }
}
</script>

<style scoped>

  .error {
    font-size: 11px;
    color: red;
    text-align: center;
  }
</style>

