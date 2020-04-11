<template>
  <div class="nav-bar">
    <b-navbar toggleable="sm" type="dark" variant="dark">
      <b-navbar-brand href="#">BeeBetter</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav right>
        <b-navbar-nav v-if="isLoggedIn">
          <b-nav-item href="/#/forms" class="text-center">Forms</b-nav-item>

          <b-nav-item
            v-if="isLoggedIn"
            class="text-center"
            right
            @click="onLogOut"
            >Sign out</b-nav-item
          >
        </b-navbar-nav>
        <b-navbar-nav v-else>
          <b-nav-item href="/#/login" class="text-center">Log in</b-nav-item>
          <b-nav-item href="/#/signup" class="text-center">Sign up</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts" src="./NavBar.ts"></script>
