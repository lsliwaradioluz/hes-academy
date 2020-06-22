<template>
  <div class="authentication">
    <div class="switch-buttons">
      <button
        class="switch-button"
        :class="{ 'switch-button--active': current == 'login' }"
        type="button"
        @click="current = 'login'"
      >
        Logowanie
      </button>
      <button
        class="switch-button"
        :class="{ 'switch-button--active': current == 'register' }"
        type="button"
        @click="current = 'register'"
      >
        Rejestracja
      </button>
    </div>
    <transition name="fade">
      <div class="login" v-if="current == 'login'">
        <h2 class="mt0">Logowanie</h2>
        <p>
          Zaloguj się do swojego konta HES Academy, aby uzyskać dostęp do
          zakupionych programów.
        </p>
        <form class="column" @submit.prevent>
          <input
            class="input-primary"
            type="text"
            v-model="identifier"
            placeholder="Adres e-mail"
            :spellcheck="false"
            autocomplete="on"
          />
          <input
            class="input-primary"
            type="password"
            v-model="password"
            placeholder="Hasło"
            :spellcheck="false"
            autocomplete="on"
          />
          <button class="button-primary" type="button" @click.prevent="signIn">
            Zaloguj się
          </button>
        </form>
      </div>
      <div class="register" v-else>
        <h2 class="mt0">Rejestracja</h2>
        <p>
          Załóż konto całkowicie za darmo i uzyskaj nieograniczony dostęp do
          bazy ćwiczeń Hes Academy oraz możliwość wykupienia programów.
        </p>
        <UserForm
          @submit="register($event)"
          :button="{
            class: 'primary',
            text: 'Zarejestruj się',
            disabled: false
          }"
        >
        </UserForm>
      </div>
    </transition>
    <button
      class="button-tertiary close-button"
      type="button"
      @click="toggleShowAuthentication(false)"
    >
      Anuluj
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      identifier: "",
      revealPassword: false,
      password: "",
      current: "login"
    };
  },
  computed: {
    redirect() {
      return this.$route.query.to;
    }
  },
  methods: {
    signIn() {
      const endpoint =
        process.env.NODE_ENV == "development"
          ? "http://localhost:1337/auth/local"
          : "https://hesacademy-backend.herokuapp.com/auth/local";
      this.$axios
        .$post(endpoint, {
          identifier: this.identifier.toLowerCase(),
          password: this.password
        })
        .then(res => {
          this.$apolloHelpers.onLogin(res.jwt, undefined, { expires: 7 });
          if (this.redirect) this.$router.push(this.redirect);
          let user = res.user;
          user.programs = user.programs.map(program => program.id);
          this.toggleShowAuthentication(false);
          this.setUser(user);
          this.setNotification(`Zalogowano jako ${user.username}`);
        })
        .catch(err => {
          this.setNotification("Nieprawidłowy login lub hasło");
        });
    },
    register(user) {
      const endpoint =
        process.env.NODE_ENV == "development"
          ? "http://localhost:1337/auth/local/register"
          : "https://hesacademy-backend.herokuapp.com/auth/local/register";
      this.$axios
        .$post(endpoint, {
          username: user.username,
          email: user.email,
          password: user.password
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
          this.setNotification("Nieprawidłowy login lub hasło");
        });
    },
    ...mapMutations({
      setUser: "auth/setUser",
      toggleShowAuthentication: "auth/toggleShowAuthentication",
      setNotification: "utils/setNotification"
    })
  }
};
</script>

<style lang="scss" scoped>
.authentication {
  padding: 2rem 1rem;
  background-color: white;
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  display: flex; 
  flex-direction: column;
}

.switch-buttons {
  position: absolute;
  bottom: 100%;
  left: 0;
  display: flex;
  align-items: flex-end;
  width: 100%;
}

.switch-button {
  padding: 1rem 1.5rem;
  background-color: rgb(216, 216, 216);
  transition: all 0.3s;
  width: 100%;
}

.switch-button--active {
  background-color: white;
}

.close-button {
  margin-top: .5rem;
}

.button-primary {
  padding: 0.5rem 1rem;
}
</style>
