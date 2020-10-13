<template>
  <div class="main-page">
    <MainHeader :slides="landing" />
    <Title
      title="Hes academy to my"
      caption="Jesteśmy trenerami z wieloletnim doświadczeniem i sprawdzonymi metodami. Trenujemy zarówno sportowców, jak i amatorów, pomagając im osiągnąć maksimum swojego potencjału."
    >
      <nuxt-link class="button-secondary" to="/personal"
        >Zobacz, jak trenujemy</nuxt-link
      >
    </Title>
    <section class="coaches">
      <Coach v-for="(coach, index) in coaches" :key="coach.id" :coach="coach" :index="index" :length="coaches.length" />
    </section>
    <section class="mission">
      <Title title="Misja" />
      <div class="mission-container main column">
        <article class="column a-center">
          <span class="flaticon-dumbbell"></span>
          <h3 class="header--underlined">Usprawniamy</h3>
          <p class="mt0">
            Usprawniamy zwykłych ludzi, oferując wszechstronny rozwój sprawności
            opartej na świadomości swojego ciała oraz tego, jak powinno
            równomiernie i prawidłowo się rozwijać.
          </p>
        </article>
        <article class="column a-center">
          <span class="flaticon-stopwatch"></span>
          <h3 class="header--underlined">Trenujemy</h3>
          <p class="mt0">
            Trenujemy sportowców, amatorów oraz zawodowców, aby rozwijali się
            optymalnie i wszechstronnie, niwelowali ryzyko kontuzji oraz
            oczywiście podnosili swój poziom sportowy.
          </p>
        </article>
        <article class="column a-center">
          <span class="flaticon-mind-mapping"></span>
          <h3 class="header--underlined">Edukujemy</h3>
          <p class="mt0">
            Edukujemy trenerów, zawodników jak również rodziców przekazując
            mieszankę najlepszych praktyk oferowanych przez najbardziej znane
            szkoły przygotowania motorycznego świata m.in EXOS, Crossfit HQ.
          </p>
        </article>
      </div>
    </section>
    <section class="clients">
      <Title title="Zaufali nam" />
      <article class="clients__images main">
        <div
          class="clients__image"
          v-for="opinion in opinions"
          :key="opinion.id"
        >
          <img :src="opinion.image.url" :alt="opinion.name" />
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import Title from "~/components/Main/Title";
import MainHeader from "~/components/MainHeader";
import getMainPage from "~/apollo/queries/getMainPage.gql";

export default {
  components: { MainHeader, Title },
  asyncData(context) {
    let client = context.app.apolloProvider.defaultClient;
    return client.query({ query: getMainPage }).then(({ data }) => {
      return {
        ...data.stronaGlowna
      };
    });
  }
};
</script>

<style lang="scss" scoped>
.coaches {
  display: flex;
  flex-wrap: wrap;
}

.mission {
  text-align: center;
  article {
    padding: 1rem 0;
    span {
      font-size: 60px;
      color: color(primary);
    }
  }
}

.clients__images {
  display: flex;
  flex-direction: column;
}

.clients__image {
  padding: 10%;
}

@media (min-width: 768px) {
  .clients__images {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }

  .clients__image {
    flex-basis: 50%;
  }
}

@media (min-width: 1024px) {

  .mission-container,
  .instructions-container {
    flex-direction: row;
    justify-content: space-between;
    article {
      width: 30%;
    }
  }

  .clients__image {
    flex-basis: 25%;
    padding: 5%;
  }
}
</style>
