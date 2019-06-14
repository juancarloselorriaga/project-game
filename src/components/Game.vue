<template>
  <div class="parent">
    <section id="game" class="game">
      <div class="game__menu">
        <label
          class="btn"
          @click.prevent="audio.isPlaying ? pause(audio) : play(audio)"
          :class="{ 'btn--audio-off': !audio.isPlaying }"
        ></label>
        <div class="game__menu-wrapper">
          <label @click="restartClicked" class="game__menu-item">Restart</label>
          <label @click="quitClicked" class="game__menu-item">Quit</label>
        </div>
      </div>
      <div class="game__wrapper" id="mine-sweeper">
        <Score
          :key="restartScore"
          :found-mines="this.foundMines"
          :next="this.nextPlayerTrigger"
          @playerTurn="modalTrigger"
        ></Score>
        <Board
          :key="restartGame"
          @next="togglePlayer"
          @found="countMines"
          :found-mines="this.foundMines"
          :activePlayerTag="this.activePlayerTag"
        ></Board>
      </div>
    </section>
    <Next-player-modal v-if="showModal" :activePlayer="this.activePlayer"></Next-player-modal>
    <Winner-modal
      v-if="whoWon"
      :winner="whoWon"
      @playAgain="playAgain"
      @quit="quitGame"
      @weHaveWinner="weHaveWinner"
    ></Winner-modal>
    <Restart-modal v-if="restartModal" @playAgain="playAgain" @resume="resumeClicked"></Restart-modal>
    <Quit-modal v-if="quitModal" @quit="quitGame" @resume="resumeClicked"></Quit-modal>
  </div>
</template>

<script>
import Board from "@/components/Board.vue";
import Score from "@/components/Score.vue";
import NextPlayerModal from "@/components/NextPlayerModal.vue";
import WinnerModal from "@/components/WinnerModal.vue";
import RestartModal from "@/components/RestartModal.vue";
import QuitModal from "@/components/QuitModal.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Game",
  components: {
    Board,
    Score,
    NextPlayerModal,
    WinnerModal,
    RestartModal,
    QuitModal
  },
  data() {
    return {
      foundMines: 0,
      nextPlayerTrigger: false,
      activePlayer: "",
      activePlayerTag: "",
      showModal: false,
      restartGame: 0,
      restartScore: 1,
      restartModal: false,
      quitModal: false,
      audio: {
        id: "background",
        file: new Audio(require("../audio/background.mp3")),
        isPlaying: false,
        maxVol: 0.6,
        minVol: 0.1
      }
    };
  },
  methods: {
    ...mapMutations(["whoIsPlaying", "reset"]),
    quitGame() {
      this.$emit("quitGame");
    },
    playAgain() {
      this.restartScore += 1;
      this.reset();
      this.foundMines = 0;
      this.restartModal = false;
      this.riseVolume(this.audio);
      return (this.restartGame += 1);
    },
    countMines(clicks) {
      if (clicks === 1) {
        this.foundMines++;
      }
    },
    togglePlayer() {
      this.nextPlayerTrigger = !this.nextPlayerTrigger;
      return this.nextPlayerTrigger;
    },
    modalTrigger(player) {
      this.showModal = true;
      setTimeout(() => (this.showModal = false), 800);

      if (player === "player1") {
        this.activePlayer = this.p1;
        this.whoIsPlaying("player1");
        // Envía el jugador activo a la tienda
      } else if (player === "player2") {
        this.activePlayer = this.p2;
        this.whoIsPlaying("player2");
        // Envía el jugador activo a la tienda
      }
    },
    restartClicked() {
      this.restartModal = true;
      this.lowerVolume(this.audio);
    },
    quitClicked() {
      this.quitModal = true;
      this.lowerVolume(this.audio);
    },
    resumeClicked() {
      this.restartModal = false;
      this.quitModal = false;
      this.riseVolume(this.audio);
    },
    weHaveWinner() {
      this.lowerVolume(this.audio);
    },
    play(audio) {
      audio.isPlaying = true;
      audio.file.loop = true;
      audio.file.play();
      this.riseVolume(audio);
    },
    pause(audio) {
      audio.isPlaying = false;
      audio.file.pause();
    },
    lowerVolume(audio) {
      audio.file.volume = audio.minVol;
    },
    riseVolume(audio) {
      audio.file.volume = audio.maxVol;
    }
  },
  computed: {
    ...mapState(["p1", "p2", "whoWon"])
  },
  created() {
    this.play(this.audio);
  },
  destroyed() {
    this.pause(this.audio);
  }
};
</script>

<style scoped>
.game {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 1rem;
}

.game__menu {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  margin: 0;
  min-width: 92.4rem;
}

.head__logo {
  width: 30rem;
}

.head__logo-img {
  width: 100%;
}

.game__menu-item {
  margin-left: 3rem;
  font-size: 1.9rem;
  color: #374785;
  transition: 0.2s all ease-in;
}

.game__menu-item:hover {
  margin-left: 3rem;
  font-size: 1.9rem;
  color: #f76c6c;
  text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
}

.game__menu-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.game__wrapper {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  min-width: 92.4rem;
  border: 0.9rem #24305e solid;
  background-color: #24305e;
  border-radius: 1.1rem;
  -webkit-box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.3);
}

.container {
  width: 50%;
  position: relative;
  text-align: start;
  padding: 3rem;
}

.btn {
  width: 44px;
  height: 44px;
  transition: all 0.3s ease-in;
  background-color: transparent;
  background: url("../assets/audio-on.svg") center no-repeat;
}

.btn--audio-off {
  background: url("../assets/audio-off.svg")  center no-repeat;
}

.parent{
  position: relative;
}
</style>
