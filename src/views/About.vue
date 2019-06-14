<template>
  <div class="about">
    <h1>About</h1>
    <div class="container">
      <label class="label" for="">Made with <span class="heart">❤</span> in CDMX</label>
      <div class="wrapper">
        <ul>
          <li class="body-item-unordered">All assets designed by Juan Carlos C. Elorriaga</li>
          <li class="body-item-unordered">Logo designed Juan Carlos C. Elorriaga</li>
          <li class="body-item-unordered">Developed and coded by Juan Carlos C. Elorriaga</li>
          <li class="body-item-unordered">&nbsp</li>
          <li class="body-item-unordered">Contact and bug report: juancarlos@jjaas.mx</li>
          <li class="body-item-unordered">Presented as the 1st module project in Ironhack CDMX 2019</li>
        </ul>
      </div>
      <div class="img-wrapper">
        <img src="../assets/jslogo.png" alt="js-logo">
        <img src="../assets/vue-logo.png" alt="vue-logo">
        <img src="../assets/vuexlogo.png" alt="vuex-logo">
      </div>
    </div>
  </div>
</template>

<style scoped>

.about{
  width: 85vw;
  height: 100vh;
  position: absolute;
  right: 0;
}

.heart{
  color:#e25555;
  }

.label {
  font-size: 2.5rem;
  color: #24305e;
  font-family: "Now";
  font-weight: 400;
  line-height: 1.7;
  display: block;
  width: 45rem;
  text-align: center;
  margin-bottom: 1rem;
}

.container {
  width: 50%;
  position: relative;
  text-align: center;
  padding: 3rem;
}

.wrapper {
  width: 90%;
}

.title {
  display: block;
  font-size: 2rem;
  margin: 2rem 0;
}

.body-item-unordered {
  font-size: 1.6rem;
  margin: 1.6rem 0;
  list-style: none;
}

h1 {
  font-size: 5rem;
  margin-top: 3rem;

}

.footer{
  margin-top: 4rem;
  width: 100%;
  padding: 0 6rem;
}

.footer-text{
  font-size: 1.3rem;
}

.img-wrapper{
  margin-top: 3rem;
}

.img-wrapper img{
  width: 10rem;
  margin: 0 3rem;
}
</style>
