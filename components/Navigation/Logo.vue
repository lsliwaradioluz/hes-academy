<template>
  <nuxt-link to="/" class="nav-logo">
    <img :src="require('../../assets/images/logo.svg')" alt="logo" />
  </nuxt-link>
</template>

<script></script>

<style lang="scss" scoped>
.nav-logo {
  width: 150px;
  z-index: 2;
  transition: width 0.3s;
  margin-right: auto;
}
</style>
