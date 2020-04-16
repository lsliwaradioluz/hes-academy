<template>
  <div class="program-page">
    <h1>Program: {{ program.nazwa }}</h1>
    <template v-if="!isItemPurchased">
      <nuxt-link tag="button" type="button" to="/cart" v-if="isItemInCart">Przejdź do koszyka</nuxt-link>
      <template v-else>
        <button type="button" @click="addItem(program)">Dodaj do koszyka</button>
        <nuxt-link tag="button" type="button" to="/cart/checkout" @click.native="buyProgram">Kup teraz</nuxt-link>
      </template>
    </template>
    <div class="lessons">
      <template v-if="lesson == null">
        <Program v-for="(lesson, index) in program.lessons" :key="lesson.id" :program="lesson" :lesson-index="index" />
      </template>
      <Lesson :lesson="program.lessons[lesson]" v-else/>
    </div>
  </div>
</template>

<script>
import getSingleProgram from '~/apollo/queries/getSingleProgram.gql';
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      program: {},
    }
  },
  apollo: {
    program: {
      query: getSingleProgram, 
      variables() {
        return {
          id: this.$route.params.id
        }
      }
    }
  }, 
  computed: {
    lesson() {
      return this.$route.query.lesson;
    },
    isItemInCart() {
      const record = this.items.find(item => item.id === this.program.id);
      return Boolean(record);
    },
    isItemPurchased() {
      const record = this.programs.find(program => program.id === this.program.id);
      return Boolean(record);
    },
    ...mapGetters({
      items: 'cart/items', 
      programs: 'auth/programs',
    })
  },
  methods: {
    ...mapMutations({
      emptyCart: 'cart/emptyCart', 
      addItem: 'cart/addItem'
    }),
    buyProgram() {
      this.emptyCart();
      this.addItem(this.program);
    }
  }
}
</script>
  
<style scoped> 
  .lessons {
    display: flex;
    margin-top: 1rem;
  }
</style>