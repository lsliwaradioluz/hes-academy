<template>
  <div class="links">
    <nuxt-link to="/articles">Blog</nuxt-link>
    <nuxt-link to="/exercises">Ćwiczenia</nuxt-link>
    <nuxt-link to="/programs">Szkolenia</nuxt-link>
    <nuxt-link to="/products">Sklep</nuxt-link>
    <nuxt-link to="/personal">Trenuj z nami</nuxt-link>
    <template v-if="user">
      <nuxt-link to="/user">Panel</nuxt-link>
      <button type="button" @click="logout">
        Wyloguj
      </button>
    </template>
    <button type="button" @click="openAuthentication" v-else>
      Logowanie
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    }
  },
  methods: {
    openAuthentication() {
      this.$store.commit("auth/toggleShowAuthentication");
      this.navigationVisible = false;
    },
    logout() {
      this.$router.push("/");
      this.$store.commit("auth/logout");
    }
  }
};
</script>

<style lang="scss" scoped>
.links {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: white;
  padding: 5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  a,
  button {
    padding: 0;
    color: color(textprimary);
    font-size: 26px;
    text-transform: uppercase;
    font-weight: 100;
    margin-bottom: 0.5rem;
    letter-spacing: 2px;
    position: relative;
    font-family: "Oswald", sans-serif;
    &::after {
      content: "";
      color: color(primary);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 105%;
      border-bottom: 2px solid color(primary);
      display: none;
    }
    &:hover::after {
      display: block;
      animation: slide-right 0.3s;
    }
  }
  div:nth-child(2) {
    button,
    a {
      color: color(primary);
    }
  }
}

.slide-right-enter-active {
  animation: slide-right 0.3s;
}

.slide-right-leave-active {
  animation: slide-right 0.3s reverse;
}

@media (min-width: 1095px) {
  .links {
    position: static;
    height: auto;
    width: auto;
    padding: 0;
    transform: none;
    background-color: transparent;
    flex-direction: row;
    color: color(primary);
    margin-right: 1rem;
    button,
    a {
      margin: 0 1rem;
      font-size: 18px;
      color: color(primary);
    }
  }
}
</style>
