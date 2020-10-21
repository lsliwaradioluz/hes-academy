<template>
  <div class="exercises-page">
    <Header background="wysilek.jpg" highlighted>
      <template v-slot:header>Trening</template>
    </Header>
    <section class="exercises-container main">
      <article class="exercise-list" v-if="exerciseFilter == null || isDesktop">
        <h2 class="header--underlined mt0">Wybrane przez doświadczenie</h2>
        <p>
          Oto baza ćwiczeń HES Academy. Wyselekcjonowaliśmy je na bazie własnych
          doświadczeń trenerskich jako te, które szczególnie mogą przysłużyć się
          adeptom treningu siłowego oraz motorycznego. Filtruj listę, wybierająć
          jedną z trzech kategorii: siłę, szybkość lub moc. Możesz także
          wyszukać konkretne ćwiczenie, wpisująć jego nazwę angielską lub
          polską.
        </p>
        <CustomSearch placeholder="Wpisz nazwę ćwiczenia..." v-model="filter" />
        <div class="category-buttons row j-between">
          <button
            class="button-tertiary"
            :class="{ active: category == 'strength' }"
            type="button"
            @click="category = 'strength'"
          >
            Siła
          </button>
          <button
            class="button-tertiary"
            :class="{ active: category == 'speed' }"
            type="button"
            @click="category = 'speed'"
          >
            Szybkość
          </button>
          <button
            class="button-tertiary"
            :class="{ active: category == 'power' }"
            type="button"
            @click="category = 'power'"
          >
            Moc
          </button>
        </div>
        <ul class="mt2">
          <ExerciseThumb
            v-for="exercise in filteredExercises"
            :key="exercise.id"
            :exercise="exercise"
            :filter="exerciseFilter"
          />
        </ul>
        <p v-if="filteredExercises.length == 0">
          Brak ćwiczeń spełniających podane kryteria.
        </p>
      </article>
      <transition name="fade">
        <ExerciseDetailed
          :exercise="displayedExercise"
          v-if="exerciseFilter != null"
        >
        </ExerciseDetailed>
      </transition>
    </section>
  </div>
</template>

<script>
import getAllExercises from "~/apollo/queries/getAllExercises.gql";
import CustomSearch from "~/components/CustomSearch";
import ExerciseDetailed from "~/components/ExerciseDetailed";

export default {
  components: { CustomSearch, ExerciseDetailed },
  asyncData(context) {
    let client = context.app.apolloProvider.defaultClient;
    return client.query({ query: getAllExercises }).then(({ data }) => {
      return {
        exercises: data.exercises
      };
    });
  },
  data() {
    return {
      filter: null,
      category: "strength",
      isDesktop: null
    };
  },
  computed: {
    exerciseFilter() {
      if (this.isDesktop) {
        return this.$route.query.exercise
          ? this.$route.query.exercise
          : this.exercises[0].id;
      } else {
        return this.$route.query.exercise;
      }
    },
    filteredExercises() {
      const filter = this.filter && this.filter.toLowerCase().trim();
      if (filter) {
        return this.exercises.filter(exercise => {
          const name = exercise.name.toLowerCase();
          const conditions = name.includes(filter) || filter.includes(name);
          return conditions;
        });
      } else if (this.category) {
        return this.exercises.filter(exercise => {
          return exercise.category == this.category;
        });
      } else {
        return this.exercises;
      }
    },
    displayedExercise() {
      return this.exercises.find(exercise => {
        return exercise.id == this.exerciseFilter;
      });
    }
  },
  mounted() {
    this.isDesktop = window.innerWidth >= 1024;
  }
};
</script>

<style lang="scss" scoped>
.button-tertiary {
  padding: 0.5rem 1rem;
  flex-grow: 1;
  text-align: center;
  &:nth-child(2) {
    margin: 0 4px;
  }
}

.active {
  background-color: color(primary);
  color: white;
}

@media (min-width: 1024px) {
  .exercises-container {
    display: flex;
    justify-content: space-between;
  }

  .exercise-list {
    flex-basis: 100%;
    flex-grow: 1;
    padding-right: 2rem;
  }
}
</style>
