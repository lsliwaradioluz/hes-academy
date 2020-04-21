import Vue from 'vue';

Vue.filter('shorten100', (value) => {
  let text = value.replace("**", "");
  return `${text.slice(0, 100)}...`;
});

Vue.filter('shorten45', (value) => {
  return `${value.slice(0, 45)}...`;
});

Vue.filter('getDate', (value) => {
  let dateWithoutTime = value.split('T');
  return dateWithoutTime[0].split('-').reverse().join('.');
});