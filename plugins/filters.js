import Vue from 'vue';

Vue.filter('previewText', (value) => {
  let valuee = value.replace("**", "");
  return `${valuee.slice(0, 100)}...`;
});

Vue.filter('getDate', (value) => {
  let dateWithoutTime = value.split('T');
  return dateWithoutTime[0].split('-').reverse().join('.');
});