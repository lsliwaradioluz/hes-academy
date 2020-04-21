<template>
  <transition name="slide-down">
    <div class="notification" v-if="notification">
      <p class="notification__message fs-12">{{ notification }}</p>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        timeout: null
      }
    },
    watch: {
      notification(value) {
        if (value) {
          clearTimeout(this.timeout);
          this.timeout = setTimeout(() => {
            this.$store.commit('utils/setNotification', null);
          }, 3000);
        }
      }
    },
    computed: {
      notification() {
        return this.$store.state.utils.notification;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .notification {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1002;
  }

  .notification__message {
    background-color: color(primary);
    padding: 1rem;
    margin: 0;
    color: white;
  }

  .slide-down-enter-active {
    animation: slide-down 0.3s;
  }

  .slide-down-leave-active {
    animation: slide-down 0.3s reverse;
  }

  @keyframes slide-down {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>