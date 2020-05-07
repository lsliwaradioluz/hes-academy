<template>
  <div class="search">
    <span></span>
    <input
      :value="value" 
      :placeholder="placeholder"
      spellcheck="false"
      autocomplete="off"
      @input="$emit('input', $event.target.value)">
  </div>  
</template>

<script>
  export default {
    props: {
      value: {
        type: String, 
      },
      placeholder: {
        type: String, 
      },
      icon: {
        type: Boolean, 
        default: () => true,
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search {
    position: relative;
    i {
      position: absolute;
      top: 18px;
      color: color(primary);
    }
  }

  input {
    background-color: transparent;
    width: 100%;
    border: 2px solid color(primary);
    color: color(primary);
    outline: none;
    margin-bottom: .5rem;
    font-size: 15px;
    font-family: 'Oswald', sans-serif;
    padding: 0.5rem;
  }
</style>