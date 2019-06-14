<template>
  <div class="score__total-count" :class="activePlayerObj">
    <p>{{this.pendingMines}}</p>
  </div>
</template>

<script>
export default {
  name: "TotalCount",
  props: {
    pendingMines: Number,
    whoIsWinning: String
  },
  computed: {
    activePlayerObj() {
      return {
        "score__total-count--p1": this.whoIsWinning === "player1",
        "score__total-count--p2": this.whoIsWinning === "player2",
        "score__total-count--draw": this.whoIsWinning === "draw"
      };
    }
  }
};
</script>

<style>
.score__total-count {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6rem;
  height: 6rem;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  transition: 0.3s ease-in;
}

.score__total-count--p1 {
  border: 0.3rem #f76c6c solid;
}

.score__total-count--p2 {
  border: 0.3rem #7893c3 solid;
}

.score__total-count--draw {
  border: 0.3rem white solid;
}

.score__total-count p {
  font-size: 1.9rem;
  color: #374785;
}
</style>

