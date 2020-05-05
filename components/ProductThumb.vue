<template>
  <nuxt-link class="product row" tag="div" :to="`/products/${product.id}`">
    <div
      class="product-image avatar"
      :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.9)), url('${product.images[0].url}')`}">
    </div>
    <div class="product-content">
      <h4 class="m00">{{ product.name }}</h4>
      <p class="m00 fs-12 t-textsecondary">{{ product.price }}zł</p>
    </div>
  </nuxt-link>
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
    background-size: cover;
    background-position: center;
    overflow: hidden;
    color: white;
    padding: .5rem 0;
    color: black;
  }

  .product-image {
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