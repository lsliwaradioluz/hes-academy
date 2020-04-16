<template>
  <div class="programs-page">
    <div class="programs">
      <Program v-for="program in programs" :program="program" :key="program.id" />
    </div>
  </div>
</template>

<script>
  import getAllPrograms from '~/apollo/queries/getAllPrograms.gql';
  
  export default {
    data() {
      return {
        programs: [],
      }
    },
    apollo: {
      programs: {
        query: getAllPrograms,
      }
    }  
  }
</script>

<style scoped>

  .programs {
    display: flex; 
  }

</style>