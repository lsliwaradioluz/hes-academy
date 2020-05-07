<template>
  <div
    class="product column j-end a-start"
    :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.9)), url('${product.images[0].url}')`}">
    <h3>{{ product.name }}</h3>
    <p class="m00">{{ product.price }}zł</p>
    <nuxt-link class="button-secondary mt05" :to="`/products/${product.id}`">Zobacz</nuxt-link>
  </div>
</template>

<script>
  export default {
    props: {
      product: {
        type: Object, 
        required: true, 
      },
    }
  }
</script>

<style lang="scss" scoped>
  .product {
    position: relative;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    min-height: 350px;
    margin-bottom: 1rem;
    color: white;
    padding: 1rem;
    h3 {
      margin-bottom: 0.5rem;
    }
  }
</style>