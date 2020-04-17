<template>
  <div class="user-page">
    <h1>Moje konto</h1>
    <p>Nazwa użytkownika: {{ user.username }}</p>
    <p>Email: {{ user.email }}</p>
    <h1>Moje programy</h1>
    <div class="programs">
      <Program v-for="program in programs" :program="program" :key="program.id" />
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      user() {
        return this.$store.getters['auth/user'];
      },
      programs() {
        return this.$store.getters['auth/programs'];
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

  .programs {
    display: flex; 
  }
</style>