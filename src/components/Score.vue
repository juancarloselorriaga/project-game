<template>
  <div class="score">
    <TotalCount :pending-mines="checkPendingMines" :who-is-winning="whoIsWinning"></TotalCount>

    <Player
      v-for="(player, index) in players"
      :toggler="playerToggle"
      :next="next"
      :key="index"
      :index="index"
      :player="player"
      :player-found-mines="player.mineCount"
      :found-mines="foundMines"
    ></Player>
  </div>
</template>

<script>
import TotalCount from "@/components/TotalCount.vue";
import Player from "@/components/Player.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Score",
  components: {
    TotalCount,
    Player
  },
  props: {
    foundMines: Number,
    next: Boolean
  },
  data() {
    return {
      totalMines: 51,
      pendingMines: 51,
      players: [
        {
          name: "",
          isActive: true,
          background: "firstPlayer",
          mineCount: 0,
          mineColor: ""
        },
        {
          name: "",
          isActive: false,
          background: "secondPlayer",
          mineCount: 0,
          mineColor: ""
        }
      ]
    };
  },
  computed: {
    ...mapState(["p1", "p2", "lastCellClicks"]),
    playerToggle() {
      if (this.lastCellClicks <= 1) {
        this.players[0].isActive = this.next;
        this.players[1].isActive = !this.next;

        if (this.players[0].isActive && !this.players[1].isActive) {
          this.$emit("playerTurn", "player1");
        } else if (this.players[1].isActive && !this.players[0].isActive) {
          this.$emit("playerTurn", "player2");
        }
      }
    },
    checkPendingMines() {
      return this.pendingMines - this.foundMines;
    },
    whoIsWinning() {
      if (this.players[0].mineCount > this.players[1].mineCount) {
        return "player1";
      } else if (this.players[0].mineCount < this.players[1].mineCount) {
        return "player2";
      } else if (this.players[0].mineCount === this.players[1].mineCount) {
        return "draw";
      }
    }
  },
  mounted() {
    this.players[0].name = this.p1;
    this.players[1].name = this.p2;
  }
};
</script>

<style>
.score {
  min-height: 64rem;
  min-width: 28.4rem;
  border-right: 0.3rem #24305e solid;
  position: relative;
  z-index: 2;
}
</style>