<template>
  <footer>
    <div class="footer-image column a-center j-center">
      <h2>Im dłużej czekasz na przyszłość, tym będzie krótsza</h2>
      <a href="mailto:info@hesacademy.pl" class="button-primary" type="button">Skontaktuj się z nami</a>
    </div>
    <div class="footer-content">
      <a href="mailto:info@hesacademy.pl">
        <span class="flaticon-email"></span>
        <p>info@hesacademy.pl</p>
      </a>
      <a href="tel:+48 880 833 780">
        <span class="flaticon-phone-call"></span>
        <p>+48 880 833 780</p>
      </a>
      <a href="https://www.facebook.com/HESAcademy/">
        <span class="flaticon-facebook"></span>
        <p>info@hesacademy.pl</p>
      </a>
      <a href="mailto:info@hesacademy.pl">
        <span class="flaticon-map-location"></span>
        <p>info@hesacademy.pl</p>
      </a>
    </div>
    <p class="footer-caption">
      Coded by Łukasz Śliwa. Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </p>
  </footer>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  .footer-image {
    padding: 5rem 1rem;
    background-attachment: fixed;
    background-image: 
      linear-gradient(rgba(0, 189, 255, 0.4), rgba(0, 189, 255, 0.4)), 
      url('../assets/images/przyszlosc.jpg');
    h2 {
      text-transform: uppercase;
      color: white;
      text-align: center;
      margin-top: 0;
    }
  }

  .footer-content {
    background-color: black;
    padding: 3rem 1rem 2rem 1rem;
    color: white;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25%;
      span {
        font-size: 40px;
      }
      p {
        margin: 0;
        margin-left: .5rem;
        font-weight: 400;
        display: none;
      }
    }
  }
  
  .footer-caption {
    background-color: black;
    margin: 0;
    padding: 1rem;
    color: color(textsecondary);
    text-align: center;
    font-size: 12px;
  }

  @media (min-width: 1024px) {
    .footer-content {
      a {
        p {
          display: block;
        }
      }
    }
  }
</style>