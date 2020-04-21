<template>
  <div class="login">
    <button class="close-button" type="button" @click="toggleShowAuthentication(false)">
      <span class="flaticon-delete"></span>
    </button>
    <h2 class="mt0">Logowanie</h2>
    <p>Zaloguj się do swojego konta HES Academy, aby uzyskać dostęp do zakupionych programów.</p>
    <form class="column" @submit.prevent>
      <input class="input-secondary" type="text" v-model="identifier" placeholder="Adres e-mail" :spellcheck="false" autocomplete="on">
      <input class="input-secondary" type="password" v-model="password" placeholder="Hasło" :spellcheck="false" autocomplete="on">
      <button class="button-primary" type="button" @click.prevent="signIn">Zaloguj</button>
      <p class="error">{{ error }}</p>
    </form> 
    <button class="fs-12 t-textsecondary" type="button" @click="toggleShowAuthentication('register')">Nie masz konta?</button>  
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
      error: '', 
    }
  },
  computed: {
    redirect() {
      return this.$route.query.to;
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
          this.$router.push(this.redirect ? this.redirect : '/user');
          this.toggleShowAuthentication(false);
          this.setUser(res.user);
        })
        .catch(err => {
          this.error = 'Nieprawidłowy login lub hasło';
        })
    },
    ...mapMutations({
      setUser: 'auth/setUser',
      toggleShowAuthentication: 'auth/toggleShowAuthentication',
    }),
  },
}
</script>

<style lang="scss" scoped>

  .login {
    background-color: white;
    padding: 1rem;
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 2px;
    right: 2px;
    span {
      font-size: 10px;
    }
  }

  .button-primary {
    padding: .5rem 1rem;
  }

  .error {
    font-size: 11px;
    color: red;
    text-align: center;
  }
</style>