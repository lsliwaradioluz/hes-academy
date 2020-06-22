<template>
  <li
    class="product tab"
    :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6) 10%, rgba(0,0,0,0.6)), url('${product.images[0].url}')`}">
    <h3 class="product__name">{{ product.name }}</h3>
    <p class="product__description">{{ product.description | shorten(90) }}</p>
    <div class="product__price">
      <p>{{ product.price }}zł</p>
      <nuxt-link tag="button" type="button" :to="`/products/${product.id}`">Zobacz</nuxt-link>
    </div>
  </li>
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

  .product__description {
    margin-top: 0;
    opacity: 0.85;
  }

  .product__price {
    margin: 0;
    border: 1px solid white;
    display: flex;
    p {
      margin: 0;
      width: 50%;
      text-align: center;
      padding: .5rem;
      background-color: white;
      color: color(primary);
      font-weight: 500;
    }
    button {
      width: 50%;
      background-color: color(primary);
      color: white;
    }
  }

  @media (min-width: 1024px) {
    .product__name {
      font-size: 24px;
    }
  }
</style>