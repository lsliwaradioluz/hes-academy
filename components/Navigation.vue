<template>
  <nav class="navigation row j-between a-center" :class="{ 'navigation--triggered': scroll > 5 && !navigationVisible }">
    <nuxt-link to="/" class="logo"><img :src="require('../assets/images/logo.svg')" alt="logo"></nuxt-link>
    <transition name="slide-right" mode="out-in">
      <button key="open" class="hamburger" type="button" @click="toggleNavigation" v-if="!navigationVisible"><span class="flaticon-menu"></span></button>
      <button key="close" class="hamburger" type="button" @click="toggleNavigation" v-else><span class="flaticon-close"></span></button>
    </transition>
    <div class="navigation-links main column a-end" :class="{ 'navigation-links--visible': navigationVisible }">
      <nuxt-link to="/articles">Blog</nuxt-link>
      <nuxt-link to="/programs">Programy</nuxt-link>
      <nuxt-link to="/user" v-if="user">Moje konto</nuxt-link>
      <nuxt-link to="/cart">Koszyk [{{ items.length}}]</nuxt-link>
      <template v-if="!user">
        <nuxt-link to="/login">Logowanie</nuxt-link>
        <nuxt-link to="/register">Rejestracja</nuxt-link>
      </template>
      <nuxt-link to="/login" @click.native="logout" v-else>Wyloguj</nuxt-link>
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
    logout() {
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

  .navigation {
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    padding: 1rem;
    transition: all 0.3s;
  }

  .navigation--triggered {
    background-color: color(white);
    box-shadow: 0 1px 10px 3px rgba(0,0,0,.2);
    .logo {
      width: 125px;
    }
  }

  .logo {
    width: 150px;
    z-index: 2;
    transition: width .3s;
  }

  .hamburger {
    color: color(primary);
    z-index: 2;
  }

  .navigation-links {
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
    a {
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
  }

  .navigation-links--visible {
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

  // .links {
  //   display: flex;
  //   align-items: center;
  // }

  // a {
  //   padding: .5rem;
  // }

  // .status {
  //   display: flex;
  // }

  // .nuxt-link-exact-active {
  //   color: color(primary);
  // }

  // p {
  //   margin: 0;
  // }
</style>