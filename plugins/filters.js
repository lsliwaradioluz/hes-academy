import Vue from 'vue';

Vue.filter('previewText', (value) => {
  return `${value.slice(0, 100)} [...]`;
});