<template>
  <form class="column" submit.prevent>
    <input class="input-secondary" type="email" placeholder="Adres e-mail" v-model="form.from" ref="email">
    <input class="input-secondary" type="text" :placeholder="subjectPlaceholder" v-model="form.subject">
    <textarea class="input-secondary" :placeholder="textPlaceholder" rows="5" v-model="form.text"></textarea>
    <button class="button-primary pt05 pb05" type="button" @click.prevent="send">Wyślij</button>
  </form>
</template>

<script>
  export default {
    props: {
      subjectPlaceholder: {
        type: String, 
        default: () => 'Temat wiadomości', 
      }, 
      textPlaceholder: {
        type: String,
        default: () => 'Treść wiadomości',
      }, 
      successMessage: {
        type: String, 
        default: () => 'Wiadomość wysłana pomyślnie.',
      }, 
      errorMessage: {
        type: String, 
        default: () => 'Coś poszło nie tak.',
      }
    },
    data() {
      return {
        form: {
          to: 'lsliwaradioluz@gmail.com',
          from: null, 
          subject: null, 
          text: null,
        }
      }
    },
    methods: {
      async send() {
        const { from, subject, text } = this.form;
        if (!from || !subject || !text) {
          this.$store.commit('utils/setNotification', 'Żadne z pól formularza nie może pozostać puste!');
          return
        }

        const endpoint = process.env.NODE_ENV == 'development' ? 'http://localhost:1337/email' : 'https://hesacademy-backend.herokuapp.com/email';

        try {
          await this.$axios.$post(endpoint, this.form); 
          this.handleSendSuccess();
        } catch (err) {
          console.log(err);
          this.handleSendFailure();
        }
      }, 
      handleSendSuccess() {
        this.$store.commit('utils/setNotification', this.successMessage);
        this.$emit('success');
        this.form = {
          to: 'lsliwaradioluz@gmail.com', 
          from: null, 
          subject: null, 
          text: null,
        }
      }, 
      handleSendFailure() {
        this.$store.commit('utils/setNotification', this.errorMessage);
      }, 
      focusInput() {
        this.$refs.email.focus();
      }
    }
  }
</script>