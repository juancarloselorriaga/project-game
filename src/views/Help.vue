<template>
  <div class="help">
    <h1>Instructions</h1>
    <div class="container">
      <div class="wrapper">
        <span class="title">Quick start</span>
        <ul>
          <li class="body-item-unordered">You are presented with a board of squares.</li>
          <li class="body-item-unordered">Some squares contain mines, others don't</li>
          <li class="body-item-unordered">The shown numbers contain the adjacent mines</li>
          <li class="body-item-unordered">The player who finds 26 of the 51 mines will win</li>
        </ul>
      </div>

      <div class="wrapper">
        <span class="title">Detail</span>
        <ul>
          <li
            class="body-item-unordered"
          >A square's "neighbours" are the squares adjacent above, below, left, right and all 4 diagonals.</li>
          <li
          <li
            class="body-item-unordered"
          >The numbered squares shows the neighbor count.</li>
          <li
            class="body-item-unordered"
          >Squares on the sides of the board or in a corner have fewer neighbours. The board does not wrap around the edges</li>
          <li
            class="body-item-unordered"
          >If a player opens a square with 0 neighboring bombs, all its neighbors will automatically open. This can cause a large area to automatically open.</li>
          <li
            class="body-item-unordered"
          >The player can continue playing if it keeps finding mines.</li>
          <li
            class="body-item-unordered"
          >The player will lose its turn when opening a square with blank or numbered.</li>
        </ul>
      </div>

      <div class="wrapper">
        <span class="title">Status information</span>
        <ul>
          <li
            class="body-item-unordered"
          >The right side bar contains each player's mine count. It will glow when the player is active</li>
          <li
            class="body-item-unordered"
          >The right side bar contains the number of bombs left to find. The counter's border will be colored with the same color as the leading player.</li>
          <li
            class="body-item-unordered"
          >If a bomb is found, it will be colored the same color as the player who found it.</li>
        </ul>
      </div>

      <div class="wrapper">
        <span class="title">Features</span>
        <ul>
          <li
            class="body-item-unordered"
          >Any player can restart the current match by clicking on the restart button</li>
          <li
            class="body-item-unordered"
          >Any player can quit the game by clicking on the quit button.</li>
          <li
            class="body-item-unordered"
          >Any player can turn the background music off.</li>
        </ul>
      </div>
      <div class="footer">
        <span class="footer-text">If you find any bugs please send me an email: juancarlos@jjaas.mx</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.help{
  width: 85vw;
  height: 100vh;
  position: absolute;
  right: 0;
}

.container {
  width: 50%;
  position: relative;
  text-align: start;
  padding: 3rem;
}

.wrapper {
  width: 90%;
}

.title {
  display: block;
  font-size: 2.5rem;
  margin: 5rem 0;
  text-align: center;
}

.body-item-unordered {
  background: url("../assets/red-mine.svg") left center no-repeat;
  padding-top: 0.1rem;
  padding-left: 3.5rem;
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
</style>
