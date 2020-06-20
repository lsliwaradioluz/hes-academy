<template>
  <nuxt-link
    class="row mt05 mb05"
    :class="{ active: filter == exercise.id }"
    tag="li"
    :to="{ path: '/exercises', query: { exercise: exercise.id } }">
    <span class="flaticon-right-chevron number"></span>
    <span class="column">
      <h3 class="m00">{{ exercise.name }}</h3>
      <p class="m00 fs-13">{{ exercise.alias }}</p>
    </span>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    exercise: {
      type: Object, 
      required: true,
    }, 
    filter: {
      type: String,
      default: () => '',
    }
  }
}
</script>

<style lang="scss" scoped>

  li {
    padding: 0.5rem 0;
    transition: background-color 0.3s;
    cursor: pointer;
    &::before {
      display: none;
    }
  }
</style>

