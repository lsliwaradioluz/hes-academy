<template>
  <div>
    {{ dupa }}
  </div>
</template>

<script>

  export default {
    computed: {
      dupa() {
        return this.$store.getters['dupa'];
      }
    }
  }
</script>

<style>

</style>
