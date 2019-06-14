<template>
  <div class="container">
    <div class="flex-row-wrapper">

    <div class="wrapper">
      <span class="label">Player 1</span>

      <transition name="fade" mode="out-in">
        <input
          v-if="p1 == ''"
          type="text"
          class="input"
          @keyup.enter="addPlayer1"
          v-model="player1"
          autofocus
          key="inputP1"
        >
        <span v-else class="label label--red" key="p1">{{p1}}</span>
      </transition>
      <transition name="fade">
        <span class="instructions-lbl">{{ p1 == "" ? 'Hit enter to assign player' : '' }}</span>
      </transition>
    </div>

    <div class="wrapper">
      <span class="label">Player 2</span>

      <transition name="fade" mode="out-in">
        <input
          ref="player2"
          v-if="p2 == ''"
          type="text"
          class="input"
          @keyup.enter="addPlayer2"
          v-model="player2"
          autofocus
          key="inputP2"
        >
        <span v-else class="label label--blue" key="p2">{{p2}}</span>
      </transition>
      <transition name="fade">
        <span class="instructions-lbl">{{ p2 == "" ? 'Hit enter to assign player' : '&nbsp' }}</span>
      </transition>
    </div>

    </div>
    <div class="button-wrapper">
      <transition name="slide-fade">
        <button class="play-btn" @click="startGameReq" v-if="p1 !== '' && p2 !== '' ">Start game</button>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "PlayStep2",
  data() {
    return {
      player1: "",
      player2: ""
    };
  },
  computed: {
    ...mapState(["p1", "p2"])
  },
  methods: {
    ...mapMutations(["assignPlayer1", "assignPlayer2", "startGame"]),
    playSound(sound, volume) {
      if (sound) {
        var audio = new Audio(sound);
        audio.volume = volume;
        audio.play();
      }
    },
    addPlayer1() {
      if (this.player1) {
        this.assignPlayer1(this.player1);
        this.player1 = "";
        this.$refs.player2.focus();
        this.playSound(require("../audio/confirmation.wav"), 1);
      }
    },
    addPlayer2() {
      if (this.player2) {
        this.assignPlayer2(this.player2);
        this.player2 = "";
        this.playSound(require("../audio/confirmation.wav"), 1);
      }
    },
    startGameReq() {
      this.$emit("startGameBtnClicked");
      this.playSound(require("../audio/button.wav"), 0.8);
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: start;
  font-size: 3rem;
  color: #24305e;
  font-family: "Now";
  font-weight: 400;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.container {
  height: 100vh;
  width: 90%;
  transition: all 0.3 ease-in-out;
}

.label,
.input {
  font-size: 2rem;
  color: #24305e;
  font-family: "Now";
  font-weight: 400;
  line-height: 1.7;
  width: 70%;
}

.label {
  justify-self: flex-end;
  display: block;
  width: 45rem;
  text-align: center;
  margin-bottom: 1rem;
}

.label--red,
.label--blue{
  font-size: 4.5rem;
  text-decoration: underline;
}

.label--red {
  color: #f76c6c;
}

.label--blue {
  color: #7893c3;
}

.input {
  padding: 1rem 2rem;
  border-radius: 1.1rem;
  border: 0.3rem #24305e solid;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in;
}

.input:focus {
  border-color: #f76c6c;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.3 ease-in-out;
  height: 30%;
  margin: 1rem;
}

.instructions-lbl {
  margin-top: 1rem;
  margin-bottom: 3rem;
  font-size: 1.5rem;
  color: rgba(34, 38, 41, 0.5);
  text-align: start;
}

.button-wrapper {
  height: 50vh;
}

.play-btn {
  margin-top: 3rem;
  padding: 1rem 4rem;
  font-weight: bold;
  font-size: 2rem;
  color: #24305e;
  font-family: "Now";
  font-weight: 400;
  line-height: 1.7;
  border-radius: 1.1rem;
  border: 0.3rem #24305e solid;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in;
}

.play-btn:hover {
  border: 0.3rem #f76c6c solid;
  color: #f76c6c;
}

.play-btn:active {
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.3);
  background-color: #24305e;
  color: white;
  border: 0.3rem white solid;
}

.flex-row-wrapper{
  display: flex;
  align-items: flex-end;
  height: 50vh;
}

.slide-fade-enter-active {
  transition: all 0.3s ease 0.8s;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
