<template>
  <div class="register">
    <button class="flaticon-delete close-button" type="button" @click="toggleShowAuthentication(false)"></button>
    <h2 class="mt0">Rejestracja</h2>
    <UserForm 
      @submit="register($event)">
    </UserForm>
    <button class="fs-12 t-textsecondary mt1" type="button" @click="toggleShowAuthentication('login')">Masz już konto?</button>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  export default {
    data() {
      return { 
        client: this.$apollo.getClient(),
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
            if (this.redirect) this.$router.push(this.redirect);
            this.toggleShowAuthentication(false);
            let user = res.user;
            user.programs = user.programs.map(program => program.id);
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
    top: 4px;
    right: 4px;
    font-size: 10px;
  }
</style>