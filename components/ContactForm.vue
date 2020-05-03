<template>
  <div class="column">
    <input class="input-secondary" type="email" placeholder="Adres e-mail" v-model="form.from">
    <input class="input-secondary" type="text" placeholder="Temat" v-model="form.subject">
    <textarea class="input-secondary" placeholder="Treść wiadomości" rows="5" v-model="form.text"></textarea>
    <button class="button-primary pt05 pb05" type="button" @click="send">Wyślij</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          to: 'info@hesacademy.pl',
          from: 'lukasz.mateusz.sliwa@gmail.com', 
          subject: 'Temat wiadomości', 
          text: 'Wiadomość testowa formularza kontaktowego',
        }
      }
    },
    methods: {
      async send() {
        // const { from, subject, text } = this.form;
        // if (!from || !subject || !text) {
        //   this.$store.commit('utils/setNotification', 'Żadne z pól formularza nie może pozostać puste!');
        //   return
        // }

        const endpoint = process.env.NODE_ENV == 'development' ? 'http://localhost:1337/email' : 'https://hesacademy-backend.herokuapp.com/email';

        try {
          await this.$axios.$post(endpoint, this.form); 
          this.handleSendSuccess();
        } catch (err) {
          this.handleSendFailure();
        }
      }, 
      handleSendSuccess() {
        this.$store.commit('utils/setNotification', 'Wiadomośc wysłana pomyślnie.');
        this.form = {
          to: 'lsliwaradioluz@gmail.com', 
          from: null, 
          subject: null, 
          text: null,
        }
      }, 
      handleSendFailure() {
        this.$store.commit('utils/setNotification', 'Coś poszło nie tak. Sprawdź połączenie z Internetem.');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>