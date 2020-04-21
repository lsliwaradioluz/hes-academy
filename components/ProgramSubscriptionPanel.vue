<template>
  <article>
    <div v-if="!isItemPurchased">
      <span class="price">{{ program.price }}zł</span>
      <p>Pierwszą lekcję możesz zobaczyć w ramach bezpłatnego dostępu. Aby zobaczyć pozostałe, wykup pełen dostęp.</p>
      <nuxt-link class="button-primary" tag="button" type="button" to="/cart" v-if="isItemInCart">Przejdź do koszyka</nuxt-link>
      <template v-else>
        <nuxt-link class="button-primary" tag="button" type="button" to="/cart/checkout" @click.native="buyProgram">Kup teraz</nuxt-link>
        <button class="button-tertiary" type="button" @click="addItem(program)">Dodaj do koszyka</button>
      </template>
    </div>
    <template v-else>
      Kupiłeś program i masz pełen dostęp
    </template>
  </article>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    props: {
      program: {
        type: Object, 
        required: true, 
      }
    },
    computed: {
      ...mapGetters({
        items: 'cart/items', 
        programs: 'auth/programs',
        user: 'auth/user',
      }),
      isItemPurchased() {
        const record = this.programs.find(program => program.id === this.program.id);
        return Boolean(record);
      },
      isItemInCart() {
        const record = this.items.find(item => item.id === this.program.id);
        return Boolean(record);
      },
    },
    methods: {
      ...mapMutations({
        emptyCart: 'cart/emptyCart', 
        addItem: 'cart/addItem'
      }),
      buyProgram() {
        if (this.user) {
          this.emptyCart();
          this.addItem(this.program);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .button-primary,
  .button-secondary {
    padding: .5rem 1rem;
  }
</style>