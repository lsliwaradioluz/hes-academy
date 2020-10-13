<template>
  <nav
    class="nav main"
    :class="{
      'nav--triggered': scroll > 5
    }"
  >
    <Logo />
    <transition name="slide-right">
      <Links v-if="linksVisible" />
    </transition>
    <div class="nav__buttons">
      <transition name="fade">
        <nuxt-link
          class="flaticon-shopping-cart mr05"
          to="/cart"
          v-if="items.length > 0"
        >
          <span>{{ items.length }}</span>
        </nuxt-link>
      </transition>
      <Search />
      <transition name="slide-right" mode="out-in">
        <button
          class="nav__buttons__trigger"
          :class="linksVisible ? 'flaticon-delete' : 'flaticon-bars'"
          :key="linksVisible"
          type="button"
          @click="toggleNavigation"
        />
      </transition>
    </div>
  </nav>
</template>

<script>
import Logo from "~/components/Navigation/Logo";
import Search from "~/components/Navigation/Search";
import Links from "~/components/Navigation/Links";

export default {
  components: { Logo, Search, Links },
  data() {
    return {
      scroll: 0,
      linksVisible: false
    };
  },
  computed: {
    items() {
      return this.$store.getters["cart/items"];
    },
    route() {
      return this.$route;
    }
  },
  watch: {
    route() {
      this.linksVisible = false
    }
  },
  methods: {
    toggleNavigation() {
      this.linksVisible = !this.linksVisible;
    },
    listenForScroll() {
      this.scroll = window.scrollY;
      window.addEventListener("scroll", () => {
        this.scroll = window.scrollY;
      });
    },
  },
  mounted() {
    this.linksVisible = window.innerWidth > 1095 ? true : false;
    this.listenForScroll()
  }
};
</script>

<style lang="scss" scoped>
.nav {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 0.3s;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.nav--triggered {
  background-color: color(white);
  box-shadow: 0 1px 10px 3px rgba(0, 0, 0, 0.2);
  .nav-logo {
    width: 125px;
  }
}

.nav__buttons {
  z-index: 2;
  display: flex;
  align-items: center;
  button {
    color: color(primary);
    font-size: 18px !important;
  }
  span {
    font-size: 10px;
  }
}

.nav__buttons__trigger {
  margin-left: 0.5rem;
}

@media (min-width: 1095px) {
  .nav {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .nav--triggered {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .nav__buttons__trigger {
    display: none;
  }
}
</style>
