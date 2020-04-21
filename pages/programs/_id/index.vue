<template>
  <div class="program-page" v-if="!$apollo.loading">
    <Header :background-url="program.image.url">
      <template v-slot:header>Program: {{ program.name }}</template>
    </Header>
    <main class="main">
      <section class="program-purchase-details" v-if="lesson == null">
        <h2 class="mt0">O kursie</h2>
        <p class="m00">{{ program.description }}</p>
        <h2>Zawartość</h2>
        <ul class="program-features">
          <li>
            <span class="flaticon-login fs-15 t-primary mr05"></span>
            {{ program.lessons.length }} wykładów w formie wideo
          </li>
          <li>
            <span class="flaticon-infinity fs-15 t-primary mr05"></span>
            Całkowity dożywotni dostęp
          </li>
          <li>
            <span class="flaticon-mobile-phone fs-15 t-primary mr05"></span>
            Dostęp na urządzeniach mobilnych
          </li>
        </ul>
        <ProgramSubscriptionPanel :program="program" />
      </section>
      <LessonDetailed :lesson="program.lessons[lesson]" v-else/>
      <section class="program-lessons column">
        <h2>Lekcje</h2>
        <Lesson 
          v-for="(lesson, index) in program.lessons" 
          :key="lesson.id" 
          :lesson="lesson" 
          :lesson-index="index" 
          :locked="!isItemPurchased && index > 0" />
      </section>
    </main>
  </div>
</template>

<script>
import getSingleProgram from '~/apollo/queries/getSingleProgram.gql';
import { mapGetters } from 'vuex';

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
    isItemPurchased() {
      const record = this.programs.find(program => program.id === this.program.id);
      return Boolean(record);
    },
    ...mapGetters({
      items: 'cart/items', 
      programs: 'auth/programs',
      user: 'auth/user',
    })
  },
}
</script>
  
<style lang="scss" scoped> 
  .program-features {
    li {
      padding: 3px 0;
    }
  }
</style>