<template>
  <div class="item-thumb row j-between a-center">
    <div class="row">
      <div
        class="item-image avatar row j-start a-end"
        :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.9)), url('${item.image.url}')`}">
        <button 
          class="delete-button flaticon-delete t-primary p00 fs-12" 
          type="button" @click="$emit('remove', item)" 
          v-if="!isCheckout">
        </button>
      </div>
      <div class="item-content">
        <nuxt-link class="m00" tag="h4" :to="`/programs/${item.id}`">{{ item.name | shorten(20) }}</nuxt-link>
        <p class="m00 fs-14">{{ item.price }}zł</p>
      </div>
    </div>
    <div class="column ml1 t-primary" v-if="item.type != 'program' && !isCheckout">
      <button class="flaticon-up-chevron fs-14 t-primary" type="button" @click="$emit('change-quantity', 'add')"></button>
      <p class="m00 t-center">x{{ item.quantity }}</p>
      <button class="flaticon-down-chevron fs-14 t-primary" type="button" @click="$emit('change-quantity', 'subtract')"></button>
    </div>
    <p class="m00 t-primary t-center" v-else>x{{ item.quantity }}</p>  
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object, 
        required: true, 
      },
    },
    computed: {
      isCheckout() {
        return this.$route.path.includes('checkout');
      }
    }
  }
</script>

<style lang="scss" scoped>

  .item-thumb {
    padding: .5rem 0;
    color: black;
  }

  .item-image {
    height: 60px;
    width: 60px;
    border: none;
    border-radius: 0;
    flex-shrink: 0;
    margin-right: 5px;
    padding-left: 4px;
    padding-bottom: 4px;
  }
</style>