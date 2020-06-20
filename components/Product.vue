<template>
  <nuxt-link
    class="product tab"
    :to="`/products/${product.id}`"
    tag="li"
    :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.9)), url('${product.images[0].url}')`}">
    <h3 class="product__name">{{ product.name }}</h3>
    <p class="m00">{{ product.price }}zł</p>
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

  .product__name {
    font-size: 22px;
    margin-bottom: 0.5rem;
  }

  @media (min-width: 1024px) {
    .product__name {
      font-size: 24px;
    }
  }
</style>