<template>
  <div class="user-page">
    <h1>Moje konto</h1>
    <p>Nazwa użytkownika: {{ user.username }}</p>
    <p>Email: {{ user.email }}</p>
  </div>
</template>

<script>
  export default {
    computed: {
      user() {
        return this.$store.getters['auth/user'];
      }
    },
  }
</script>

<style scoped>
  .user-page a {
    background-color: red;
    margin-top: 1rem;
    color: white;
    padding: 1rem;
    display: inline-block;
    border-radius: 6px;
  }
</style>