import Vue from 'vue';

Vue.filter('shorten100', (value) => {
  let text = value.replace("**", "");
  return `${text.slice(0, 100)}...`;
});

Vue.filter('shorten45', (value) => {
  if (value.length > 45) {
    return `${value.slice(0, 45)}...`;
  } else {
    return value;
  }
});

Vue.filter('getDate', (value) => {
  let dateWithoutTime = value.split('T');
  return dateWithoutTime[0].split('-').reverse().join('.');
});