<template>
  <form class="search" @submit.prevent="submit">
    <input
      class="search__input"
      placeholder="Czego szukasz?"
      v-model="search"
    />
    <button
      class="search__button button-primary"
      type="button"
      @click="submit"
      >Szukaj</button
    >
  </form>
</template>

<script>
export default {
  data() {
    return {
      search: null
    };
  }, 
  methods: {
    submit() {
      if (this.search.length < 3) {
        const message = 'Szukana fraza musi mieć co najmniej 3 znaki'
        this.$store.commit('utils/setNotification', message)
        return
      }
      this.$router.push({ path: '/search', query: { search: this.search.trim() } })
      this.search = null
      this.$emit('search')
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  padding: .5rem 1rem;
}

.search__input {
  background-color: transparent;
  border: 1px solid color(primary);
  color: color(primary);
  transition: opacity 0.3s;
  padding-left: 20px;
  outline: none;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 100%;
}

.search__button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding-right: 20px;
}
</style>
