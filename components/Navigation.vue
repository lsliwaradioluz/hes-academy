<template>
  <nav class="nav row j-between a-center" :class="{ 'nav--triggered': scroll > 5 && !navigationVisible }">
    <nuxt-link to="/" class="nav-logo logo">
      <img :src="require('../assets/images/logo.svg')" alt="logo">
    </nuxt-link>
    <div class="nav-icons">
      <transition name="fade">
        <nuxt-link to="/cart" v-if="items.length > 0">
          <span class="flaticon-shopping-cart mr05">
            <span class="fs-12">{{ items.length }}</span>
          </span>
        </nuxt-link>
      </transition>
      <transition name="slide-right" mode="out-in">
        <button 
          key="open"
          type="button" 
          @click="toggleNavigation" 
          v-if="!navigationVisible">
          <span class="flaticon-bars"></span>
        </button>
        <button 
          key="close" 
          type="button" 
          @click="toggleNavigation" 
          v-else>
          <span class="flaticon-delete"></span>
        </button>
      </transition>
    </div>
    <div class="nav-links main" :class="{ 'nav-links--visible': navigationVisible }">
      <div class="column a-end">
        <nuxt-link to="/articles">Blog</nuxt-link>
        <nuxt-link :to="{ path: '/exercises', query: { cat: 'strength' } }">Ćwiczenia</nuxt-link>
        <nuxt-link to="/programs">Programy</nuxt-link>
        <nuxt-link to="/products">Sklep</nuxt-link>
        <nuxt-link to="/personal">Trenuj z nami</nuxt-link>
      </div>
      <div class="column a-end">
        <nuxt-link to="/user" v-if="user">Panel</nuxt-link>
        <template v-if="!user">
          <button type="button" @click="openLogin">Logowanie</button>
          <button type="button" @click="openRegister">Rejestracja</button>
        </template>
        <button type="button" @click="logout" v-else>Wyloguj</button>
        <p class="fs-12 t-texttertiary mt0" v-if="user">Zalogowano jako {{ user.username }}</p>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navigationVisible: false,
      scroll: 0,
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/user'];
    }, 
    items() {
      return this.$store.getters['cart/items'];
    },
    route() {
      return this.$route;
    }
  },
  watch: {
    route() {
      this.navigationVisible = false;
    }
  },
  methods: {
    openLogin() {
      this.$store.commit('auth/toggleShowAuthentication', 'login');
      this.navigationVisible = false;
    },
    openRegister() {
      this.$store.commit('auth/toggleShowAuthentication', 'register');
      this.navigationVisible = false;
    },
    logout() {
      this.$router.push('/');
      this.$store.commit('auth/logout');
    },
    toggleNavigation() {
      this.navigationVisible = !this.navigationVisible;
    }
  },
  mounted() {
    this.scroll = window.scrollY;
    window.addEventListener('scroll', () => {
      this.scroll = window.scrollY;
    });
  }
}
</script>

<style lang="scss" scoped>

  .nav {
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    transition: all 0.3s;
  }

  .nav--triggered {
    background-color: color(white);
    box-shadow: 0 1px 10px 3px rgba(0,0,0,.2);
    .nav-logo {
      width: 125px;
    }
  }

  .nav-logo {
    width: 150px;
    z-index: 2;
    transition: width .3s;
  }

  .nav-icons {
    z-index: 2;
    button {
      padding: 0;
    }
    span {
      color: color(primary);
    }
  }

  .nav-links {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: white;
    padding-top: 3rem;
    transform: translateX(100%);
    transition: transform 0.4s;
    padding-top: 5rem;
    a,
    button {
      font-size: 26px;
      text-transform: uppercase;
      font-weight: 100;
      color: color(textPrimary);
      margin-bottom: .5rem;
      letter-spacing: 2px;
      position: relative;
      font-family: 'Oswald', sans-serif;
      &::after {
        content: "";
        letter-spacing: -1px;
        color: color(primary);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-bottom: 2px solid color(primary);
        display: none;
      }
      &:hover::after {
        display: block;
        animation: slide-right 0.3s;
      }
    }
    div:nth-child(2) {
      button, a {
        color: color(primary);
      }
    }
  }

  .nav-links--visible {
    transform: translateX(0);
  }

  .slide-right-enter-active {
    animation: slide-right 0.3s;
  }

  .slide-right-leave-active {
    animation: slide-right 0.3s reverse;
  }

  @keyframes slide-right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
</style>