<template>
  <div class="main-page">
    <section class="landing">
      <Header background="wysilek.jpg" :video="landing[currentLanding].video" :key="currentLanding" big>
        <template v-slot:header>{{ landing[currentLanding].header }}</template>
        <template v-slot:caption>{{ landing[currentLanding].subheader }}</template>
      </Header>
      <article class="landing-controls">
        <button class="flaticon-left-chevron" type="button" :disabled="currentLanding == 0" @click="currentLanding--"></button>
        <button class="flaticon-right-chevron" type="button" :disabled="currentLanding == landing.length - 1" @click="currentLanding++"></button>
      </article>
    </section>
    <section class="instructions main">
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
    </section>
    <section class="coaches main pt0">
      <h2 class="t-center">HES Academy to my</h2>
      <Carousel :columns="[[1, 1], [768, 2], [1024, 3]]">
        <article class="coach-container" v-for="coach in coaches" :key="coach.id"> 
          <Coach :coach="coach"></Coach>
        </article>
      </Carousel>
    </section>
    <section class="mission">
      <h2 class="m00">Misja</h2>
      <div class="mission-container main column">
        <article class="column a-center">
          <span class="flaticon-dumbbell"></span>
          <h3 class="header--underlined">Usprawniamy</h3>
          <p class="mt0">Usprawniamy zwykłych ludzi, oferując wszechstronny rozwój sprawności opartej na świadomości swojego ciała oraz tego, jak powinno równomiernie i prawidłowo się rozwijać.</p>
        </article>
        <article class="column a-center">
          <span class="flaticon-stopwatch"></span>
          <h3 class="header--underlined">Trenujemy</h3>
          <p class="mt0">Trenujemy sportowców, amatorów oraz zawodowców, aby rozwijali się optymalnie i wszechstronnie, niwelowali ryzyko kontuzji oraz oczywiście podnosili swój poziom sportowy.</p>
        </article>
        <article class="column a-center">
          <span class="flaticon-mind-mapping"></span>
          <h3 class="header--underlined">Edukujemy</h3>
          <p class="mt0">Edukujemy trenerów, zawodników jak również rodziców przekazując mieszankę najlepszych praktyk oferowanych przez najbardziej znane szkoły przygotowania motorycznego świata m.in EXOS, Crossfit HQ.</p>
        </article>
      </div>
    </section>
    <section class="clients">
      <h2 class="m00">Zaufali nam</h2>
      <div class="main">
        <Carousel :show-pagination="false" :columns="[[1, 1], [768, 2], [1024, 3]]" autoplay>
          <article class="column" v-for="opinion in opinions" :key="opinion.id" >
            <Opinion :opinion="opinion" />
          </article>
        </Carousel>
      </div>
    </section>
  </div>
</template>

<script>
  import getMainPage from '~/apollo/queries/getMainPage.gql';

  export default {
    asyncData(context) {
      let client = context.app.apolloProvider.defaultClient;
      return client.query({ query: getMainPage })
        .then(({ data }) => {
          return {
            ...data.stronaGlowna
          }
        });
    },
    data() {
      return {
        currentLanding: 0,
      }
    }
  }
</script>

<style lang="scss" scoped>

  .landing {
    position: relative;
  }

  .landing-controls {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    button {
      height: 100%;
      color: rgba(255, 255, 255, 0.555);
      font-size: 20px;
    }
    button:disabled {
      opacity: 0.4;
    }
  }

  .instructions {
    text-align: center;
    h2 {
      text-transform: uppercase;
      color: color(textSecondary);
      margin-bottom: 4rem;
    }
    article {
      padding: 1rem 0;
      span {
        font-size: 60px;
        color: color(primary);
      }
    }
  }
  
  .mission {
    text-align: center;
    h2 {
      background-color: color(primary);
      padding: 2rem 1rem;
      color: white;
      text-transform: uppercase;
      text-align: center;
      color: color(white);
      margin-bottom: 2rem;
    }
    article {
      padding: 1rem 0;
      span {
        font-size: 60px;
        color: color(primary);
      }
    }
  }

  .clients {
    h2 {
      background-color: color(primary);
      padding: 2rem 1rem;
      color: white;
      text-transform: uppercase;
      text-align: center;
      color: color(white);
      margin-bottom: 2rem;
    }
    article {
      padding: 40px 1rem;
      padding-bottom: 0;
    }
  }

  @media (min-width: 1024px) {

    .landing-controls button {
      font-size: 40px;
    }

    .coaches {
      padding-left: 12%;
      padding-right: 12%;
    }

    .coach-container {
      padding: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .mission-container, 
    .instructions-container {
      flex-direction: row;
      justify-content: space-between;
      article {
        width: 30%;
      }
    }
  }
</style>
