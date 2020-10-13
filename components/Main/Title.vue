<template>
  <div class="title main">
    <h2 class="title__main">{{ title }}</h2>
    <h4 class="title__sub" v-if="caption">{{ caption }}</h4>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Your awesome title"
    },
    caption: {
      type: String,
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: color(primary);
  padding-top: 4rem;
  padding-bottom: 4rem;
  color: white;
  text-transform: uppercase;
  margin: 0;
}

.title__main {
  margin: 0;
}

.title__sub {
  text-transform: none;
}

.title__main,
.title__sub {
  max-width: 600px;
  text-align: center;
}
</style>
