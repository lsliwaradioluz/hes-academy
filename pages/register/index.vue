<template>
  <div class="register-page">
    <h1>Zarejestruj się</h1>
    <form @submit.prevent>
      <input 
        v-model="user.username" 
        placeholder="Imię i nazwisko"
        type="text"
        :spellcheck="false"
        autocomplete="on">
      <input 
        v-model="user.email" 
        placeholder="Adres e-mail"
        type="email"
        :spellcheck="false"
        autocomplete="on">
      <input 
        v-model="user.password" 
        placeholder="Hasło"
        type="password"
        :spellcheck="false"
        autocomplete="on">
      <input
        v-model="user.repeatPassword" 
        placeholder="Powtórz hasło"
        type="password"
        :spellcheck="false"
        autocomplete="on">
      <button @click.prevent="register" type="button">Załóż konto</button>
      <p>{{ error }}</p>
      <div>
        <span>Masz już konto?&nbsp;</span>
        <nuxt-link to="/login">Zaloguj się</nuxt-link>
      </div>
    </form>      
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    data() {
      return { 
        client: this.$apollo.getClient(),
        user: {
          username: null, 
          email: null, 
          password: null, 
          repeatPassword: null, 
        },
        error: ''
      }
    },
    methods: {
      register() {
        if (this.user.password != this.user.repeatPassword) {
          this.error = 'Podane hasła nie są takie same';
          return
        }
        
        const endpoint = process.env.NODE_ENV == 'development' ? 'http://localhost:1337/auth/local/register' : 'https://hesacademy-backend.herokuapp.com/auth/local/register';
        this.$axios.$post(endpoint, {
          username: this.user.username,
          email: this.user.email, 
          password: this.user.password,
        })
          .then(res => {
            this.$apolloHelpers.onLogin(res.jwt, undefined, { expires: 7 })
            this.setUser(res.user);
            this.$router.push({
              path: '/user'
            });
          })
          .catch(err => {
            this.error = 'Nie można zarejestrować';
          })
      },
      ...mapMutations({
        setUser: 'auth/setUser',
      })
    }, 
  }
</script>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  input {
    margin-bottom: .5rem;
  }
</style>