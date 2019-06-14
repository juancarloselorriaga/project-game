<template>
  <div class="board-cell board-cell--initial" @click="select">
    <div :class="cellObj" v-if="this.clicks > 0">
      <h1
        class="h1"
        :class="colorObj"
        v-if="!this.mined && this.surroundingMines"
      >{{this.surroundingMines}}</h1>
    </div>

    <div class="current-selection" v-if="this.id === this.selectedCell"></div>

    <div v-if="this.mined && this.clicks > 0" class="mine-wrapper">
      <img class="shapeshifter play" src="@/assets/svg/boom/sprite_60fps.svg">
      <img class="mine" :src="this.mineColor">
    </div>

    <!-- <div v-if="this.mined && this.clicks > 0" class="mine-wrapper">
      <img class="shapeshifter play" src="@/assets/svg/boom/sprite_60fps.svg">
      <img class="mine" :src="mineImg">
    </div>-->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Cell",
  props: {
    id: String,
    mined: Boolean,
    index: Number,
    surroundingMines: Number,
    selectedCell: String,
    clicks: Number,
    mineColor: String
  },
  computed: {
    cellObj() {
      return {
        "board-cell--initial": this.clicks === 0,
        "board-cell--open": !this.mined && this.clicks > 0,
        "board-cell mined": this.mined && this.clicks > 0
      };
    },
    colorObj() {
      return {
        "color--one": this.surroundingMines === 1,
        "color--two": this.surroundingMines === 2,
        "color--three": this.surroundingMines === 3,
        "color--four": this.surroundingMines === 4,
        "color--five": this.surroundingMines === 5
      };
    }
  },
  methods: {
    select() {
      this.$emit("select", this.id, this.index);
      this.selected = true;
    }
  }
};
</script>

<style>
.board-cell {
  width: 6.25%;
  height: 4rem;
  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  transition: 0.3s all ease-in;
}

.board-cell--initial {
  background-color: #374785;
  box-sizing: border-box;
  position: relative;
  transition: 0.3s all ease-in;
}

@keyframes growUp {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

.board-cell--open {
  border: 0.1rem rgba(207, 173, 0, 0.5) solid;
  border-radius: 10%;
  width: 100%;
  height: 100%;
  background-color: #f8e9a1;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  -webkit-animation: growUp 0.3s;
  -moz-animation: growUp 0.3s;
  -ms-animation: growUp 0.3s;
  -o-animation: growUp 0.3s;
  animation: growUp 0.3s;
}

.board-cell--open:after {
  animation: shine 10s ease-in-out infinite;
  animation-fill-mode: forwards;
  content: "";
  position: absolute;
  top: -110%;
  left: -210%;
  width: 200%;
  height: 200%;
  opacity: 0;
  transform: rotate(30deg);

  background: rgba(255, 255, 255, 0.13);
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.13) 0%,
    rgba(255, 255, 255, 0.13) 77%,
    rgba(255, 255, 255, 1) 92%,
    rgba(255, 255, 255, 0) 100%
  );
}

.board-cell--open:active:after {
  opacity: 0;
}

/* @keyframes shine{
  10% {
    opacity: 1;
    top: -30%;
    left: -30%;
    transition-property: left, top, opacity;
    transition-duration: 0.7s, 0.7s, 0.15s;
    transition-timing-function: ease;
  }
  100% {
    opacity: 0;
    top: -30%;
    left: -30%;
    transition-property: left, top, opacity;
  }
} */

.mined {
  border: none;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  display: none;
  /* background: url("../assets/red-mine.svg") center no-repeat; */
  overflow: hidden;
}

.color--one {
  color: #374785;
}

.color--two {
  color: #f468e5;
}

.color--three {
  color: #45c54c;
}

.color--four {
  color: #4e3785;
}

.color--five {
  color: #f76c6c;
}

.mine-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes float {
  0% {
    transform: translatey(0px);
  }
  50% {
    transform: translatey(-5px);
  }
  100% {
    transform: translatey(0px);
  }
}

.mine {
  position: absolute;
  width: 75%;
  height: 75%;
  animation: float 3s ease-in-out infinite, growUp 0.3s;
  z-index: 5;
}

.current-selection {
  position: absolute;
  border: 0.3rem #f76c6c solid;
  border-radius: 10%;
  width: 100%;
  height: 100%;
}

@keyframes boom {
  0% {
    background-position: 0px 0px;
    z-index: 6;
  }
  100% {
    background-position: -1440px 0px;
    z-index: 6;
  }
}
.shapeshifter {
  position: absolute;
  animation-duration: 1000ms;
  animation-timing-function: steps(60);
  width: 24px;
  height: 24px;
  background-image: url("../assets/svg/boom/sprite_60fps.svg");
  background-repeat: no-repeat;
  z-index: 4;
}
.shapeshifter.play {
  animation-name: boom;
}

.h1 {
  font-size: 1.8rem;
}

.red-mine {
  background-image: url("../assets/red-mine.svg");
  background-repeat: no-repeat;
  background-position: center;
}

.blue-mine {
  background-image: url("../assets/blue-mine.svg");
  background-repeat: no-repeat;
  background-position: center;
}
</style>