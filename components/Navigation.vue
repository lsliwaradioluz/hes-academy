<template>
  <nav>
    <div class="links">
      <nuxt-link to="/">Strona główna</nuxt-link>
      <nuxt-link to="/programs">Programy</nuxt-link>
      <nuxt-link to="/user">Moje konto</nuxt-link>
    </div>
    <div class="cart">
      <nuxt-link to="/cart">Koszyk ({{ items.length}})</nuxt-link>
    </div>
    <div class="status">  
      <template v-if="!user">
        <nuxt-link to="/login">Logowanie</nuxt-link>
        <nuxt-link to="/register">Rejestracja</nuxt-link>
      </template>
      <nuxt-link to="/login" @click.native="logout" v-else>Wyloguj {{ user.username }}</nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    }, 
    items() {
      return this.$store.getters['cart/items'];
    }
  },
  methods: {
    logout() {
      this.$store.commit('auth/logout');
    }
  },
}
</script>

<style scoped>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    padding: 0 1rem;
    background-color: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .links {
    display: flex;
    align-items: center;
  }

  a {
    padding: .5rem;
  }

  .status {
    display: flex;
  }

  .nuxt-link-exact-active {
    background-color: lightgoldenrodyellow;
  }

  p {
    margin: 0;
  }
</style>