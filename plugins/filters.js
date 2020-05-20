import Vue from 'vue';

Vue.filter('shorten', (value, toLength) => {
  if (value.length > toLength) {
    let text = value.replace("**", "");
    return `${text.slice(0, toLength)}...`
  } else {
    return value;
  }
});

Vue.filter('getDate', (value) => {
  let dateWithoutTime = value.split('T');
  return dateWithoutTime[0].split('-').reverse().join('.');
});