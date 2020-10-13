<template>
  <div class="coach">
    <div
      class="coach__avatar"
      :style="{ backgroundImage: `url('${coach.image.url}')` }"
    />
    <div class="coach__details">
      <h2 class="coach__details__header">{{ coach.name }}</h2>
      <p class="coach__details__text" v-show="showMore">
        {{ coach.description }}
      </p>
      <p class="coach__details__text" v-show="!showMore">
        {{ coach.description | shorten(200) }}
      </p>
      <button type="button" class="button-tertiary" @click="toggleShowMore">
        {{ showMore ? "Mniej" : "Więcej" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    coach: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    },
    length: {
      type: Number
    }
  },
  data() {
    return {
      showMore: false
    };
  },
  methods: {
    toggleShowMore() {
      this.showMore = !this.showMore;
    }
  }
};
</script>

<style lang="scss" scoped>
.coach {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.coach__avatar {
  width: 100%;
  max-width: 668px;
  min-height: 500px;
  background-size: cover;
  background-position: center top;
}

.coach__details {
  background-color: black;
  color: white;
  padding: 2rem 0;
  width: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.coach__details__header {
  margin-top: 0;
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-size: 40px;
  padding: 0 1rem;
}

.coach__details__text {
  font-size: 17px;
  margin-top: 0;
  max-width: 600px;
  padding: 0 1rem;
}

@media (min-width: 668px) {
  .coach {
    flex-direction: row;
    border-bottom: 1px solid color(primary);
    &:nth-child(odd) {
      flex-direction: row-reverse;
    }
  }
}
</style>
