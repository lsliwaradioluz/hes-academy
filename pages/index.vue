<template>
  <div>
    <p>{{ programs }}</p>
  </div>
</template>

<script>

  import getAllPrograms from '~/apollo/queries/getAllPrograms.gql';

  export default {
    data() {
      return {
        programs: []
      }
    },
    apollo: {
      programs: {
        query: getAllPrograms
      }
    }
  }
</script>

<style>

</style>
