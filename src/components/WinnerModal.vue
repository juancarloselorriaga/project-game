<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <img src="@/assets/winner.svg" alt="winner-img" class="winner-img">
              <span class="modal-title">{{ this.winner }} wins!!!</span>
            </slot>
            <div class="btn-wrapper">
              <label class="btn" @click="playAgain">Play again</label>
              <label class="btn" @click="quit">Quit</label>
            </div>
          </div>

          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Winner-modal",
  props: {
    winner: String
  },
  methods: {
    playSound(sound, volume) {
      if (sound) {
        var audio = new Audio(sound);
        audio.volume = volume;
        audio.play();
      }
    },
    playAgain() {
      this.playSound(require("../audio/button.wav"), 0.8);
      this.$emit("playAgain");
    },
    quit() {
      this.$emit("quit");
    }
  },
  mounted() {
    this.playSound(require("../audio/winner.mp3"), 1);
    this.$emit("weHaveWinner");
  }
};
</script>


<style scoped>
.modal-mask {
  position: absolute;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: auto;
  margin: 0px auto;
  padding: 20px 30px;

  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.btn {
  margin: 3rem 1rem;
  padding: 1rem 5rem;
  font-weight: bold;
  font-size: 2.5rem;
  color: white;
  font-family: "Now";
  font-weight: 400;
  line-height: 1.7;
  border-radius: 1.1rem;
  transition: all 0.3s ease-in;
}

.btn:hover {
  color: #f76c6c;
  background-color: white;
}

.btn-wrapper {
  margin-top: 3rem;
}

.modal-title {
  font-size: 4rem;
  color: white;
}
</style>

