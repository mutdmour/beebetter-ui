<template>
 <b-container class="login mt-2">
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
   <b-button-toolbar>
    <b-button-group class="mx-1">
     <b-button type="submit" variant="primary">Submit</b-button>
    </b-button-group>
    <b-button-group class="mx-1">
     <b-button href="#/signup" variant="outline-primary">Sign Up</b-button>
    </b-button-group>
   </b-button-toolbar>
  </b-form>
 </b-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
 name: 'LoginView',
 data() {
  return {
   form: {
    email: '',
    password: '',
   },
  }
 },
 methods: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit(event: any) {
   event.preventDefault()
   this.$store
    .dispatch('user/login', {
     username: this.form.email,
     password: this.form.password,
    })
    .then(() => {
     this.$bvToast.toast('Logged in', {
      variant: 'success',
      solid: false,
      appendToast: true,
      noCloseButton: true,
     })
     this.$router.push('/')
    })
    .catch(() => {
     this.$bvToast.toast('Login failed', {
      variant: 'danger',
      solid: false,
      appendToast: true,
      noCloseButton: true,
     })
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
