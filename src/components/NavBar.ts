import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
 name: 'NavBar',
 computed: {
  ...mapGetters({
    isLoggedIn: 'user/isLoggedIn',
  }),
  showLogin() {
    return this.$route.path != '/login' && !this.isLoggedIn
  }
 },
 methods: {
  onLogOut() {
   this.$store.dispatch('user/logout').then(() => {
    this.$router.push('/')
   })
  },
 },
})
