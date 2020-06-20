<template>
  <div class="default-layout">
    <Navigation />
    <nuxt />
    <Footer />
    <!-- not in the main view -->
    <Notification />
    <Modal :show="showAuthentication != false" @close="closeAuthentication" >
      <transition name="slide-right" mode="out-in">
        <Authentication />
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
    closeAuthentication() {
      this.$store.commit('auth/toggleShowAuthentication');
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
