<template>
  <div class="item-thumb row j-between a-center">
    <div class="row">
      <div
        class="item-image avatar"
        :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.9)), url('${item.image.url}')`}">
      </div>
      <div class="item-content">
        <nuxt-link :to="`/programs/${item.id}`">
          <h4 class="m00">{{ item.name | shorten45 }}</h4>
        </nuxt-link>
        <p class="m00">{{ item.price }}zł</p>
      </div>
    </div>
    <button class="ml1" type="button" @click="$emit('delete', item)" v-if="showDeleteButton">
      <span class="flaticon-delete t-primary"></span>
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object, 
        required: true, 
      },
      showDeleteButton: {
        type: Boolean, 
        default: () => true,
      }
    },
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
  }
</style>