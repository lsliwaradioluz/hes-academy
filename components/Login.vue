<template>
  <div class="login">
    <button class="flaticon-delete close-button" type="button" @click="toggleShowAuthentication(false)"></button>
    <h2 class="mt0">Logowanie</h2>
    <p>Zaloguj się do swojego konta HES Academy, aby uzyskać dostęp do zakupionych programów.</p>
    <form class="column" @submit.prevent>
      <input class="input-secondary" type="text" v-model="identifier" placeholder="Adres e-mail" :spellcheck="false" autocomplete="on">
      <input class="input-secondary" type="password" v-model="password" placeholder="Hasło" :spellcheck="false" autocomplete="on">
      <button class="button-primary" type="button" @click.prevent="signIn">Zaloguj</button>
    </form> 
    <button class="fs-12 t-textsecondary mt1" type="button" @click="toggleShowAuthentication('register')">Nie masz konta?</button>  
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
          if (this.redirect) this.$router.push(this.redirect);
          let user = res.user;
          user.programs = user.programs.map(program => program.id);
          this.toggleShowAuthentication(false);
          this.setUser(user);
          this.setNotification(`Zalogowano jako ${user.username}`);
        })
        .catch(err => {
          this.setNotification('Nieprawidłowy login lub hasło');
        })
    },
    ...mapMutations({
      setUser: 'auth/setUser',
      toggleShowAuthentication: 'auth/toggleShowAuthentication',
      setNotification: 'utils/setNotification',
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
    top: 4px;
    right: 4px;
    font-size: 10px;
  }

  .button-primary {
    padding: .5rem 1rem;
  }
</style>