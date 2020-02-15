<template>
 <div id="app" class="vh-100 w-100">
  <nav-bar />
  <router-view />
 </div>
</template>

<script lang="ts">
import Vue from 'vue'
import NavBar from './components/NavBar'

export default Vue.extend({
 name: 'App',
 components: {
  'nav-bar': NavBar,
 },
})
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

#app {
 font-family: Avenir, Helvetica, Arial, sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 text-align: center;
 color: #2c3e50;
}
</style>
