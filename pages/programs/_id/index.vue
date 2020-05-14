<template>
  <div class="program-page">
    <Header :background-url="program.image.url">
      <template v-slot:header>{{ program.name }}</template>
      <template v-slot:caption>Program</template>
    </Header>
    <main class="main" ref="top">
      <LessonDetailed 
        :lesson="program.lessons[lesson]" 
        :lesson-index="lesson"
        @back="$router.push(`/programs/${program.id}`)"
        v-if="lesson != null || isDesktop">
      </LessonDetailed>
      <section>
        <article v-if="lesson == null || isDesktop">
          <h2 class="mt0">O programie</h2>
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
          <!-- <ProgramSubscriptionPanel :program="program" :item-purchased="itemPurchased" /> -->
        </article>
        <h2 class="mb05">Wykłady</h2>
        <Lesson 
          v-for="(lesson, index) in program.lessons" 
          :key="lesson.id" 
          :lesson="lesson" 
          :lesson-index="index"
          :img="program.image.url" 
          :locked="index > 0 && !itemPurchased">
        </Lesson>
        <p class="t-textsecondary fs-12" v-if="program.lessons.length == 0">Brak wykładów do pokazania.</p>
      </section>
    </main>
  </div>
</template>

<script>
import getSingleProgram from '~/apollo/queries/getSingleProgram.gql';
import { mapGetters } from 'vuex';

export default {
  async asyncData(context) {
    let client = context.app.apolloProvider.defaultClient;
    const response = await client.query({ query: getSingleProgram, variables: { id: context.route.params.id } });
    return {
      program: response.data.program,        
    }
  },
  data() {
    return {
      isDesktop: null,
    }
  },
  computed: {
    ...mapGetters({
      items: 'cart/items',
      user: 'auth/user',
    }),
    lesson() {
      if (this.isDesktop) {
        return this.$route.query.lesson ? this.$route.query.lesson : 0;
      } else {
        return this.$route.query.lesson;
      }
    },
    itemPurchased() {
      if (!this.user) return false;
      const record = this.user.programs.find(program => program === this.program.id);
      if (record) return true;
    },
    query() {
      return this.$route.query
    },
  },
  watch: {
    query() {
      this.$refs.top.scrollIntoView({ behavior: 'smooth' });
    }
  },
  mounted() {
    this.isDesktop = window.innerWidth >= 1024;
  } 
}
</script>
  
<style lang="scss" scoped> 
  .program-features {
    li {
      padding: 3px 0;
      &::before {
        display: none;
      }
    }
  }
  
  @media (min-width: 1024px) {
    main {
      display: flex;
      flex-direction: row-reverse;
      section {
        flex-basis: 50%;
        &:nth-child(1) {
          padding-left: 2rem;
          border-left: 1px solid color(texttertiary);
        }
        &:nth-child(2) {
          padding-right: 2rem;
        }
      }
    }
  }
</style>