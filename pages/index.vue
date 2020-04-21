<template>
  <div class="main-page">
    <Header background="wysilek.jpg">
      <template v-slot:header>Każdy wysiłek ma znaczenie</template>
      <template v-slot:caption>Hes Academy tworzą ludzie, dla których świat sportu i rehabilitacji nie ma tajemnic.</template>
    </Header>
    <section class="mission c
    padding: 0 1rem;olumn">
      <h2>Misja</h2>
      <article class="column a-center">
        <span class="flaticon-dumbbell"></span>
        <h3 class="header--underlined">Usprawniamy</h3>
        <p class="mt0">Usprawniamy zwykłych ludzi, oferując wszechstronny rozwój sprawności opartej na świadomości swojego ciała oraz tego, jak powinno równomiernie i prawidłowo się rozwijać</p>
      </article>
      <article class="column a-center">
        <span class="flaticon-stopwatch"></span>
        <h3 class="header--underlined">Trenujemy</h3>
        <p class="mt0">Trenujemy sportowców, amatorów oraz zawodowców, aby rozwijali się optymalnie i wszechstronnie, niwelowali ryzyko kontuzji oraz oczywiście podnosili swój poziom sportowy</p>
      </article>
      <article class="column a-center">
        <span class="flaticon-mind-mapping"></span>
        <h3 class="header--underlined">Edukujemy</h3>
        <p class="mt0">Edukujemy trenerów, zawodników jak również rodziców przekazując mieszankę najlepszych praktyk oferowanych przez najbardziej znane szkoły przygotowania motorycznego świata m.in EXOS, Crossfit HQ</p>
      </article>
    </section>
    <section class="coaches">
      <Carousel :navdots-settings="{ activeColor: '#00BDFF', shape: 'round' }">
        <Coach v-for="coach in coaches" :key="coach.id" :coach="coach"></Coach>
      </Carousel>
    </section>
    <section class="instructions">
      <h2 class="header--underlined">Członkostwo</h2>
      <article>
        <span class="flaticon-login"></span>
        <h3 class="header--underlined">Załóż konto</h3>
        <p class="mt0">Dołącz do rosnącej społeczności HES Academy. Rejestracja jest darmowa i stanowi niezbędny krok na drodze do uzyskania dostępu do naszych programów</p>
      </article>
      <article>
        <span class="flaticon-book"></span>
        <h3 class="header--underlined">Znajdź swój program</h3>
        <p class="mt0">Zapoznaj się z naszą bazą szkoleń on-line i wybierz ten, który najbardziej odpowiada Twoim potrzebom</p>
      </article>
      <article>
        <span class="flaticon-payment-method"></span>
        <h3 class="header--underlined">Korzystaj do woli</h3>
        <p class="mt0">Wykup dożywotni dostęp do wybranego programu i ciesz się nim bez ograniczeń!</p>
      </article>
      <article>
        <span class="flaticon-ebook"></span>
        <h3 class="header--underlined">Oglądaj mobilnie</h3>
        <p class="mt0">Dodaj aplikację Hes Academy do ekranu głównego i ciesz się uproszczonym dostępem do zakupionych treści na urządzeniach mobilnych</p>
      </article>
    </section>
    <section class="clients">
      <h2 class="clients-header">Zaufali nam</h2>
      <Carousel :pagination="false" autoplay>
        <article class="column" v-for="client in clients" :key="client.id" >
          <Client :client="client" />
        </article>
      </Carousel>
    </section>
  </div>
</template>

<script>
  import getAllCoaches from '~/apollo/queries/getAllCoaches.gql';
  import getAllClients from '~/apollo/queries/getAllClients.gql';

  export default {
    apollo: {
      coaches: {
        query: getAllCoaches, 
      }, 
      clients: {
        query: getAllClients,
      }
    },
    data() {
      return {
        coaches: [], 
        clients: [],
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .mission {
    padding: 2rem 1rem;
    text-align: center;
    h2 {
      text-transform: uppercase;
      color: color(textSecondary);
    }
    article {
      padding: 1rem 0;
      span {
        font-size: 60px;
        color: color(primary);
      }
    }
  }

  .instructions {
    padding: 2rem 1rem;
    text-align: center;
    h2 {
      text-transform: uppercase;
      color: color(textSecondary);
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
    padding: 2rem 1rem;
    h2 {
      background-color: color(primary);
      margin-left: -1rem;
      margin-right: -1rem;
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
</style>
