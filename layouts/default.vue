<template>
  <div class="default-layout">
    <Navigation />
    <nuxt />
    <Footer />
    <!-- not in the main view -->
    <Notification />
    <Modal :show="showAuthentication != false" @close="closeLogin" >
      <transition name="slide-right" mode="out-in">
        <Login v-if="showAuthentication == 'login'" />
        <Register v-if="showAuthentication == 'register'" />
      </transition>
    </Modal>
  </div>
</template>

<script>
export default {
  computed: {
    showAuthentication() {
      return this.$store.getters['auth/showAuthentication'];
    },
  },
  methods: {
    closeLogin() {
      this.$store.commit('auth/toggleShowAuthentication', false);
    }
  },
}
</script>

<style lang="scss" scoped>
  .slide-right-enter-active,
  .slide-right-leave-active {
    animation-duration: .2s;
  }
</style>
