<template>
 <div id="app" class="vh-100 w-100">
  <nav-bar />
  <router-view />
 </div>
</template>

<script lang="ts" src="./App.ts"></script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

#app {
 font-family: Avenir, Helvetica, Arial, sans-serif;
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale;
 color: #2c3e50;
 font-size: 1.25rem;
 line-height: 1.5;
 font-weight: 400;
 height: 100vh;
 width: 100%;
}
</style>
