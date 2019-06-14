<template>
  <div class="home">
    <transition name="fade" mode="out-in">
      <PlayStep1 v-if="this.showPlayBtn" @playBtnClicked="playBtnClicked"></PlayStep1>
      <PlayStep2 v-if="this.showPlyrs" @startGameBtnClicked="startGameBtnClicked"></PlayStep2>
      <Game v-if="showGame" @quitGame="quitGame"></Game>
    </transition>
  </div>
</template>

<script>
import Game from "@/components/Game.vue";
import PlayStep1 from "@/components/PlayStep1.vue";
import PlayStep2 from "@/components/PlayStep2.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "home",
  components: {
    Game,
    PlayStep1,
    PlayStep2
  },
  data() {
    return {
      showPlayBtn: true,
      showPlyrs: false,
      showGame: false
    };
  },
  methods: {
    ...mapMutations([
      "assignPlayer1",
      "assignPlayer2",
      "reset",
      "resetPlayers"
    ]),
    quitGame() {
      this.showPlayBtn = true;
      this.showPlyrs = false;
      this.showGame = false;
      this.reset();
      this.resetPlayers();
      this.playSound(require("../audio/quit.mp3"));
    },
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    },
    playBtnClicked() {
      this.showPlayBtn = false;
      this.showPlyrs = true;
      this.playSound(require("../audio/button.wav"));
    },
    startGame() {
      if (this.gameStatus) {
        this.showPlyrs = false;
        this.showGame = true;
        return this.showGame;
      }
    },
    startGameBtnClicked() {
      this.showPlyrs = false;
      this.showGame = true;
      return this.showGame;
    }
  },
  computed: {
    ...mapState(["gameStatus"])
  },
  created(){
      this.showPlayBtn = true;
      this.showPlyrs = false;
      this.showGame = false;
      this.reset();
      this.resetPlayers();
  }
};
</script>

<style scoped>

.home{
  width: 85vw;
  height: 100vh;
  position: absolute;
  right: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

