<template>
  <nuxt-link class="article row" tag="div" :to="`/articles/${article.id}`">
    <div
      class="article-image avatar"
      :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.9)), url('${article.image.url}')`}">
    </div>
    <div class="article-content">
      <h4 class="m00">{{ article.title }}</h4>
      <p class="m00 fs-12 t-textsecondary">{{ article.createdAt | getDate }}</p>
    </div>
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
    background-size: cover;
    background-position: center;
    overflow: hidden;
    color: white;
    padding: .5rem 0;
    color: black;
  }

  .article-image {
    height: 60px;
    width: 60px;
    border: none;
    border-radius: 0;
    flex-shrink: 0;
    margin-right: 5px;
  }

  a {
    margin-top: 1rem;
    padding: .5rem 1rem;
    border-radius: 0;
  }
</style>