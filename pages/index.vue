<template>
  <div class="main-page">
    <section class="landing">
      <MainHeader :slides="landing" />
    </section>
    <!-- <section class="instructions main">
      <h2>Zainwestuj w siebie!</h2>
      <div class="instructions-container column">
        <article>
          <span class="flaticon-login"></span>
          <h3 class="header--underlined">Załóż konto</h3>
          <p class="mt0">Załóż konto za darmo, aby uzyskać dostęp do bazy ponad 100 ćwiczeń. Rejestracja stanowi niezbędny krok na drodze do uzyskania dostępu do naszych programów.</p>
        </article>
        <article>
          <span class="flaticon-book"></span>
          <h3 class="header--underlined">Znajdź swój program</h3>
          <p class="mt0">Zapoznaj się z naszą bazą programów on-line i wybierz ten, który najbardziej odpowiada Twoim potrzebom. Pierwszy wykład każdego programu jest dostępny za darmo.</p>
        </article>
        <article>
          <span class="flaticon-ebook"></span>
          <h3 class="header--underlined">Korzystaj do woli</h3>
          <p class="mt0">Wykup dożywotni dostęp do danego programu, aby odblokować pozostałe wykłady. Ciesz się nimi bez ograniczeń - również na urządzeniach mobilnych!</p>
        </article>
      </div>
    </section> -->
    <section class="coaches">
      <h2 class="coaches__title">HES Academy to my</h2>
      <div class="coaches__container main">
        <Carousel
          :columns="[
            [1, 1],
            [768, 2],
            [1024, 3]
          ]"
          :navigation-config="{
            activeColor: '#00BDFF',
          }"
        >
          <article
            class="coach-container"
            v-for="coach in coaches"
            :key="coach.id"
          >
            <Coach :coach="coach" />
          </article>
        </Carousel>
      </div>
    </section>
    <section class="mission">
      <h2 class="mission__title">Misja</h2>
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
      <h2 class="clients__title">Zaufali nam</h2>
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
import MainHeader from "~/components/MainHeader";
import getMainPage from "~/apollo/queries/getMainPage.gql";

export default {
  components: { MainHeader },
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
.coach-container {
  display: flex;
  justify-content: center;
}

.coaches__title,
.mission__title,
.clients__title {
  text-align: center;
  background-color: color(primary);
  padding: 2rem 1rem;
  color: white;
  text-transform: uppercase;
  text-align: center;
  color: color(white);
  margin: 0;
  font-weight: 300;
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
  }

  .clients__image {
    flex-basis: 50%;
  }
}

@media (min-width: 1024px) {
  .landing-controls button {
    font-size: 40px;
  }

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
