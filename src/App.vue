<template>
  <div id="app">
    <div id="nav">
      <div class="game__menu">
        <div class="head__logo">
          <img class="head__logo-img" src="@/assets/Logo2.svg" alt="mine-sweeper-logo">
        </div>
      </div>
      <div class="nav__item-wrapper">
        <router-link class="link" to="/">Play</router-link> -
        <router-link class="link" to="/help">Help</router-link> -
        <router-link class="link" to="/about">About</router-link>
      </div>
      <hr>
    </div>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
}

#app {
  text-align: center;
  color: #f76c6c;
  box-sizing: border-box;
  font-family: "Now";
  font-weight: 400;
  line-height: 1.7;
  color: #24305e;
  background-color: white;
}
#nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 15vw;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
}

.link {
  font-weight: bold;
  color: #24305e;
  text-decoration: none;
  margin: 4rem;
  font-size: 1.9rem;
}

.link.router-link-exact-active {
  color: #f76c6c;
  text-decoration: underline;
}

.nav__item-wrapper {
  display: flex;
  flex-direction: column;
}

.game__menu {
  display: inline-block;
  padding: 1rem;
}

.head__logo {
  width: 95%;
}

.head__logo-img {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
