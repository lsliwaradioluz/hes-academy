<template>
  <article>
    <div class="column" v-if="!isItemPurchased">
      <span class="price">{{ program.price }}zł</span>
      <p>Pierwszą lekcję możesz zobaczyć w ramach bezpłatnego dostępu. Aby zobaczyć pozostałe, wykup pełen dostęp.</p>
      <nuxt-link class="button-tertiary" tag="button" type="button" to="/cart" v-if="isItemInCart">Przejdź do koszyka</nuxt-link>
      <button class="button-primary" type="button" @click="addToCart" v-else>Dodaj do koszyka</button>
    </div>
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
        user: 'auth/user',
        programs: 'auth/programs',
      }),
      isItemPurchased() {
        const record = this.programs.find(program => program.id === this.program.id);
        return Boolean(record);
      },
      isItemInCart() {
        const record = this.items.find(item => item.id === this.program.id);
        return Boolean(record);
      },
      programForCart() {
        const programForCart = {
          id: this.program.id,
          name: this.program.name, 
          description: this.program.description,
          price: this.program.price, 
          image: this.program.image,
          stripeID: this.program.stripeID,
        }

        return programForCart;
      }
    },
    methods: {
      ...mapMutations({
        emptyCart: 'cart/emptyCart', 
        addItem: 'cart/addItem', 
        setNotification: 'utils/setNotification',
      }),
      addToCart() {
        this.addItem(this.programForCart);
        this.setNotification('Dodano produkt do koszyka');
      },
      buyProgram() {
        if (this.user) {
          this.emptyCart();
          this.addItem(this.programForCart);
          this.$router.push('/cart/checkout');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .button-primary,
  .button-tertiary {
    padding: .5rem 1rem;
  }
</style>