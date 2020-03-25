<template>
 <b-container class="signup">
  <b-form @submit="onSubmit">
   <b-form-group
    id="email-group-1"
    label="Email address:"
    label-for="email-input"
   >
    <b-form-input
     id="email-input"
     v-model="form.email"
     type="email"
     required
    ></b-form-input>
   </b-form-group>
   <b-form-group
    id="password-group-2"
    label="Password:"
    label-for="password-input"
   >
    <b-input
     type="password"
     id="password-input"
     v-model="form.password"
     required
     aria-describedby="password-help-block"
    ></b-input>
   </b-form-group>
   <b-form-group
    id="beeminder-username-group"
    label="Beeminder Username:"
    label-for="beeminder-username"
   >
    <b-form-input
     id="beeminder-username"
     v-model="form.beeminderUsername"
     required
    ></b-form-input>
   </b-form-group>
   <b-form-group
    id="beeminder-auth-token-group"
    label="Beeminder Auth Token:"
    label-for="beeminder-auth-token"
   >
    <b-form-input
     id="beeminder-auth-token"
     v-model="form.beeminderAuthToken"
     required
    ></b-form-input>
   </b-form-group>
   <b-button-toolbar>
    <b-button-group class="mx-1">
     <b-button type="submit" variant="primary">Submit</b-button>
    </b-button-group>
    <b-button-group class="mx-1">
     <b-button href="#/login" variant="outline-primary">Login</b-button>
    </b-button-group>
   </b-button-toolbar>
  </b-form>
 </b-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
 name: 'SignupView',
 data() {
  return {
   form: {
    email: '',
    password: '',
    beeminderUsername: '',
    beeminderAuthToken: '',
   },
  }
 },
 methods: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit(event: any) {
   event.preventDefault()
   if (this.form.password.length < 6) {
    this.$bvToast.toast('Password must be at least 6 characters long', {
     variant: 'danger',
     solid: false,
     appendToast: true,
     noCloseButton: true,
    })

    return
   }

   this.$store.commit('user/signup', {
    username: this.form.email,
    password: this.form.password,
    beeminderUsername: this.form.beeminderUsername,
    beeminderAuthToken: this.form.beeminderAuthToken,
   })
  },
 },
 watch: {
  $route() {
   // SPA navigation
  },
 },
})
</script>
