<template>
  <form class="column" @submit.prevent>
    <input 
      class="input-primary"
      v-model="newUser.username" 
      placeholder="Imię i nazwisko"
      type="text"
      :spellcheck="false"
      autocomplete="on">
    <input 
      class="input-primary"
      v-model="newUser.email" 
      placeholder="Adres e-mail"
      type="email"
      :spellcheck="false"
      autocomplete="on">
    <input 
      class="input-primary"
      v-model="newUser.password" 
      :placeholder="user ? 'Nowe hasło' : 'Hasło'"
      type="password"
      :spellcheck="false"
      autocomplete="on">
    <input
      class="input-primary"
      v-model="newUser.repeatPassword" 
      placeholder="Powtórz hasło"
      type="password"
      :spellcheck="false"
      autocomplete="on">
    <button 
      class="button-primary" 
      @click.prevent="submit" 
      type="button" 
      v-if="button.class == 'primary'">
      {{ button.text }}
    </button>
    <button 
      class="button-tertiary" 
      @click.prevent="submit" 
      type="button" 
      :disabled="disabled || loading"
      v-else>
      {{ button.text }}
    </button>
  </form>        
</template>

<script>
  export default {
    props: {
      user: {
        type: Object,
        default: () => {
          return { 
            username: null, 
            email: null, 
          }
        }
      },
      button: {
        type: Object,
        default: () => {
          return {
            class: 'primary', 
            text: 'Zatwierdź', 
            disabled: false,
          }
        },
      }
    }, 
    data() {
      return {
        newUser: { 
          ...this.user,
          password: null, 
          repeatPassword: null,
        }
      }
    },
    computed: {
      disabled() {
        const conditions = 
          this.newUser.username == this.user.username 
          && this.newUser.email == this.user.email
          && !this.newUser.password
          && !this.newUser.repeat;
        
        return conditions;  
      },
      loading() {
        return this.$nuxt.$loading.show;
      }
    },
    methods: {
      submit() {
        if (this.newUser.password == this.newUser.repeatPassword) {
          const user = this.newUser.password ? 
            { username: this.newUser.username, email: this.newUser.email, password: this.newUser.password }
            : { username: this.newUser.username, email: this.newUser.email };
          this.$emit('submit', user);
          this.newUser.password = null;
          this.newUser.repeatPassword = null;
        } else {
          this.$store.commit('utils/setNotification', 'Podane hasła nie są takie same');
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  
  .button-tertiary,
  .button-primary {
    padding: .5rem 1rem;
  }

  .button-tertiary {
    align-self: flex-start;
  }
</style>