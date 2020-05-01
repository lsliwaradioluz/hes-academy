<template>
  <div class="video-player">
    <video 
      ref="video"
      width="320" height="240"
      controls>
      <source :src="src" type="video/mp4">
      <source :src="src" type="video/ogg">
    </video>
    <!-- <div class="controls column">
      <div class="controls__seekbar">
        <span class="controls__seekbar-mark" :style="{ width: `${percentage}%` }"></span>
      </div>
      <div class="controls__buttons">
        <button type="button" @click="play" v-show="!playing">Play</button>
        <button type="button" @click="pause" v-show="playing">Pause</button>
      </div>
    </div> -->
  </div>
</template>

<script>
  export default {
    props: {
      src: {
        type: String, 
        required: true, 
      }
    }, 
    data() {
      return {
        playing: false,
        percentage: 0,
      }
    },
    methods: {
      play() {
        this.$refs.video.play();
      },
      pause() {
        this.$refs.video.pause();
      }, 
      updateTime() {
        const video = this.$refs.video;
        this.percentage = (video.currentTime / video.duration) * 100;
      }
    }
  }
</script>

<style lang="scss" scoped>

  .video-player {
    position: relative;
  }

  video {
    width: 100%;
    height: 100%;
    vertical-align: middle;
    outline: none;
  }

  .controls {
    position: absolute;
    bottom: 0;
    padding: 0.5rem;
    width: 100%;
  }

  .controls__seekbar {
    background-color: rgba(255, 255, 255, 0.37);
    height: 2px;
    width: 100%;
    position: relative;
  }

  .controls__seekbar-mark {
    background-color: color(primary);
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    &::after {
      content: "";
      height: 10px;
      width: 10px;
      background-color: color(primary);
      position: absolute;
      right: -5px;
      top: -4px;
      border-radius: 50%;
    }
  }

  .controls

  button {
    color: white;
  }
</style>