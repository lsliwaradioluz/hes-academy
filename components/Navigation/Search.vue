<template>
  <div class="search">
    <button
      class="search__trigger flaticon-search"
      type="button"
      @click="toggleSearch"
    />
    <Modal :show="showSearch" @close="toggleSearch" transition="slide-right">
      <div class="search__body main" ref="search">
        <input
          class="search__body__input"
          placeholder="Czego szukasz?"
          v-model="search"
        />
        <button
          class="search__body__button button-primary"
          type="button"
          @click="showResults"
        >
          Szukaj
        </button>
        <button
          class="search__body__button button-primary"
          type="button"
          @click="toggleSearch"
        >
          Zamknij
        </button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSearch: false,
      search: ""
    };
  },
  methods: {
    toggleSearch() {
      this.showSearch = !this.showSearch;
    },
    showResults() {
      if (this.search.length < 3) {
        const message = "Szukana fraza musi mieć co najmniej 3 znaki";
        this.$store.commit("utils/setNotification", message);
        return;
      }
      this.$router.push({
        path: "/search",
        query: { search: this.search.trim() }
      });
      this.toggleSearch();
      this.search = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.search__trigger {
  font-size: 18px;
  color: color(primary);
}

.search__body {
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.4s;
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.search__body__input {
  background-color: transparent;
  border: none;
  color: color(primary);
  outline: none;
  width: 100%;
  padding-right: 1rem;
  font-size: 16px;
}

.search__body__button {
  border-radius: 0;
  &:nth-child(3) {
    display: none;
  }
}

@media (min-width: 1024px) {
  .search__body__button {
    &:nth-child(3) {
      display: block;
      margin-left: 0.5rem;
    }
  }
}
</style>
