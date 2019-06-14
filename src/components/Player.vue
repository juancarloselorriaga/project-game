<template>
  <div class="score__p1-wrapper" :class="backgroundObj">
    <div class="container" :class="cellObj">
      <h3 class="score__player-title">{{ this.player.name }}</h3>
      <div class="score__count-wrapper">
        <div class="mine-icon"></div>
        <h3 class="score__player-count">{{ this.playerFoundMines }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Player",
  props: {
    player: Object,
    index: Number,
    playerFoundMines: Number,
    next: Boolean,
    foundMines: Number
  },
  data() {
    return {};
  },
  computed: {
    cellObj() {
      return {
        "container--active-player": this.player.isActive === true
      };
    },
    backgroundObj() {
      return {
        "bg--secondary": this.player.background === "firstPlayer",
        "bg--secondary first-player-glow":
          this.player.background === "firstPlayer" && this.player.isActive,
        "bg--primary": this.player.background === "secondPlayer",
        "bg--primary second-player-glow":
          this.player.background === "secondPlayer" && this.player.isActive
      };
    }
  },
  methods: {
    ...mapMutations(["won"])
  },
  watch: {
    foundMines() {
      if (this.player.isActive) {
        this.player.mineCount++;
        if (this.player.mineCount === 26) {
          this.won(this.player.name);
        }
      }
    }
  }
};
</script>

<style>
@-webkit-keyframes GlowAnimation {
  0% {
    background-position: 2% 0%;
  }
  50% {
    background-position: 99% 100%;
  }
  100% {
    background-position: 2% 0%;
  }
}
@-moz-keyframes GlowAnimation {
  0% {
    background-position: 2% 0%;
  }
  50% {
    background-position: 99% 100%;
  }
  100% {
    background-position: 2% 0%;
  }
}
@keyframes GlowAnimation {
  0% {
    background-position: 2% 0%;
  }
  50% {
    background-position: 99% 100%;
  }
  100% {
    background-position: 2% 0%;
  }
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
}

.container--active-player {
  width: 80%;
  padding: 1rem 0;
  border: 0.3rem white solid;
  border-radius: 0.4rem;
}

.score__p1-wrapper,
.score__p2-wrapper {
  width: 100%;
  height: 50%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.score__player-title,
.score__player-count {
  font-size: 2.8rem;
  color: white;
}

.score__player-title {
  margin-bottom: 2rem;
}

.score__player-count {
  margin-left: 2rem;
  text-align: center;
}

.score__count-wrapper {
  display: flex;
  align-items: center;
}

.mine-icon {
  background: url("../assets/white-mine.svg") no-repeat;
  width: 2.6rem;
  height: 2.4rem;
}

.bg--secondary {
  background-color: #f76c6c;
}

.bg--primary {
  background-color: #7893c3;
}

.first-player-glow {
  background: linear-gradient(181deg, #f76c6c, #f7cbcb, #f76c6c);
}

.second-player-glow {
  background: linear-gradient(181deg, #7893c3, rgb(217, 231, 240), #7893c3);
}

.first-player-glow,
.second-player-glow {
  background-size: 600% 600%;

  -webkit-animation: GlowAnimation 4s ease-in infinite;
  -moz-animation: GlowAnimation 4s ease-in infinite;
  animation: GlowAnimation 4s ease-in infinite;
}
</style>
