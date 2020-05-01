<template>
  <div class="register">
    <button class="close-button" type="button" @click="toggleShowAuthentication(false)">
      <span class="flaticon-delete"></span>
    </button>
    <h2 class="mt0">Rejestracja</h2>
    <UserForm 
      @submit="register($event)">
    </UserForm>
    <p class="error">{{ error }}</p>
    <button class="fs-12 t-textsecondary" type="button" @click="toggleShowAuthentication('login')">Masz już konto?</button>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    data() {
      return { 
        client: this.$apollo.getClient(),
        error: ''
      }
    },
    computed: {
      redirect() {
        return this.$route.query.to;
      }
    },
    methods: {
      register(user) {        
        const endpoint = process.env.NODE_ENV == 'development' ? 'http://localhost:1337/auth/local/register' : 'https://hesacademy-backend.herokuapp.com/auth/local/register';
        this.$axios.$post(endpoint, {
          username: user.username,
          email: user.email, 
          password: user.password,
        })
          .then(res => {
            this.$apolloHelpers.onLogin(res.jwt, undefined, { expires: 7 });
            this.$router.push(this.redirect ? this.redirect : '/user');
            this.toggleShowAuthentication(false);
            this.setUser(res.user);
          })
          .catch(err => {
            this.error = 'Nie można zarejestrować';
          })
      },
      ...mapMutations({
        setUser: 'auth/setUser',
        toggleShowAuthentication: 'auth/toggleShowAuthentication'
      })
    }, 
  }
</script>

<style lang="scss" scoped>

  .register {
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

  .error {
    font-size: 11px;
    color: red;
    text-align: center;
  }
</style>