<template>
  <div class="cart-page">
    <h2>Twój koszyk</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        <p>{{ item.nazwa }}</p>
        <p>{{ item.cena }}</p>
        <button type="button" @click="removeItem(item)">Usuń</button>
      </li>
    </ul>
    <nuxt-link to="checkout" append>Przejdź do kasy</nuxt-link>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        items: 'cart/items',
      })
    },
    methods: {
      ...mapMutations({
        removeItem: 'cart/removeItem'
      })
    },
  }
</script>


