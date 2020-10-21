<template>
  <nuxt-link
    class="exercise__thumb"
    :class="{ active: filter == exercise.id }"
    tag="li"
    :to="{ path: '/exercises', query: { exercise: exercise.id } }"
  >
    <span class="flaticon-right-chevron number"></span>
    <span class="exercise__thumb__details">
      <h3 class="m00">{{ exercise.name }}</h3>
      <p class="m00 fs-13" v-if="exercise.alias">{{ exercise.alias }}</p>
    </span>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    exercise: {
      type: Object,
      required: true
    },
    filter: {
      type: String,
      default: () => ""
    }
  }
};
</script>

<style lang="scss" scoped>
.exercise__thumb {
  display: flex;
  margin: 0.5rem 0;
}

.exercise__thumb__details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
li {
  padding: 0.5rem 0;
  cursor: pointer;
  &::before {
    display: none;
  }
}
</style>
