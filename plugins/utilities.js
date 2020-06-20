import Vue from 'vue';

// Vue filters

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

// String prototype methods

String.prototype.escapeDiacritics = function() {
  return this.replace(/ą/g, 'a').replace(/Ą/g, 'A')
    .replace(/ć/g, 'c').replace(/Ć/g, 'C')
    .replace(/ę/g, 'e').replace(/Ę/g, 'E')
    .replace(/ł/g, 'l').replace(/Ł/g, 'L')
    .replace(/ń/g, 'n').replace(/Ń/g, 'N')
    .replace(/ó/g, 'o').replace(/Ó/g, 'O')
    .replace(/ś/g, 's').replace(/Ś/g, 'S')
    .replace(/ż/g, 'z').replace(/Ż/g, 'Z')
    .replace(/ź/g, 'z').replace(/Ź/g, 'Z');
}