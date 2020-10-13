<template>
  <footer class="footer">
    <Contact />
    <ul class="footer__links main">
      <li v-for="link in links" :key="link.key">
        <a
          :href="`${link.modifier ? link.modifier : ''}${stopka[link.key]}`"
          class="footer__link"
          :class="`flaticon-${link.icon}`"
          :target="link.target"
        >
          <p class="footer__link-caption">
            {{ link.caption ? link.caption : stopka[link.key] }}
          </p>
        </a>
      </li>
    </ul>
    <p class="footer__signature">
      Coded by Łukasz Śliwa. Icons made by
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik"
        >Freepik</a
      >
      from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </p>
  </footer>
</template>

<script>
import Contact from "~/components/Footer/Contact";
import getFooter from "~/apollo/queries/getFooter.gql";

export default {
  apollo: {
    stopka: {
      query: getFooter
    }
  },
  components: { Contact },
  data() {
    return {
      links: [
        { icon: "telephone", key: "telephone", modifier: "tel:" },
        { icon: "email", key: "email", modifier: "mailto:" },
        {
          icon: "facebook",
          key: "facebook",
          caption: "Facebook",
          target: "_blank"
        },
        {
          icon: "instagram",
          key: "instagram",
          caption: "Instagram",
          target: "_blank"
        },
        {
          icon: "map",
          key: "address",
          caption: "Wielkopolska 72H",
          target: "_blank"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.footer__links {
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 0;
  li {
    padding: 0;
  }
  li:before {
    display: none;
  }
}

.footer__link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  padding: 1.5rem 0;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.7;
  }
}

.footer__link-caption {
  margin: 0;
  font-weight: 400;
  margin-top: 0.5rem;
}

.footer__signature {
  background-color: black;
  margin: 0;
  padding: 1rem;
  color: color(textsecondary);
  border-top: 1px solid color(faded);
  text-align: center;
  font-size: 12px;
}

@media (min-width: 1024px) {
  .footer__image {
    padding: 8rem 1rem;
  }

  .footer__image__title {
    font-size: 40px;
  }

  .footer__image__button {
    padding: 1rem 3rem;
    font-size: 18px;
  }

  .footer__links {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
