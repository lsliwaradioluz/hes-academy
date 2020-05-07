<template>
  <nuxt-link
    :to="`/articles/${article.id}`"
    tag="div" 
    class="article column j-end" 
    :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.9)), url('${article.image.url}')`}">
    <p class="article-date m00 fs-12">{{ article.createdAt | getDate }}</p>
    <h3>{{ article.title }}</h3>
    <p class="m00">{{ article.text | shorten100 }}</p>
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
  .article {
    position: relative;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    min-height: 350px;
    color: white;
    padding: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
    h3 {
      margin-bottom: 0.5rem;
    }
  }

  .article-date {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(-45deg) translateX(-40px) translateY(-10px);
    background-color: color(primary);
    color: white;
    padding: 2px;
    width: 140px;
    text-align: center;
  }
</style>