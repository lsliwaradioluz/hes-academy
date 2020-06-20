<template>
  <nuxt-link
    class="article tab" 
    :to="`/articles/${article.id}`"
    tag="li"
    :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${article.image.url}')`}">
    <h3 class="article__title">{{ article.title }}</h3>
    <p class="article__text">{{ article.text | shorten(120) }}</p>
    <p class="article__date">{{ article.createdAt | getDate }}</p>
  </nuxt-link>
</template>

<script>
  export default {
    props: {
      article: {
        type: Object, 
        required: true, 
      },
    }
  }
</script>

<style lang="scss" scoped>

  .article__title {
    margin-bottom: .5rem;
    font-size: 22px;
  }

  .article__text {
    margin: 0;
    opacity: 0.85;
  }

  .article__date {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(-45deg) translateX(-40px) translateY(-10px);
    background-color: color(primary);
    color: white;
    padding: 2px;
    margin: 0;
    width: 140px;
    text-align: center;
    font-size: 12px;
  }

  @media (min-width: 1024px) {
    .article__title {
      font-size: 24px;
    }
  }
</style>