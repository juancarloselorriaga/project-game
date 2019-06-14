<template>
  <div class="board">
    <Cell
      v-for="(cell, index) in cells"
      @select="selectCell"
      :key="index"
      :index="index"
      :id="cell.x + '-' + cell.y"
      :clicks="cell.clicks"
      :selected-cell="selectedCell"
      :class="{ mined : !selectCell }"
      :mined="cell.isMined"
      :surrounding-mines="cell.surroundingMines"
      :mineColor="cell.mineColor"
    ></Cell>
  </div>
</template>

<script>
import Cell from "@/components/Cell.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Board",
  components: {
    Cell
  },
  props: {
    foundMines: Number,
    activePlayerTag: String
  },
  data() {
    return {
      calcY: 0,
      calcX: 0,
      cellNum: 254,
      cells: [
        {
          x: 0,
          y: 0,
          isMined: false,
          surroundingMines: 0,
          clicks: 0,
          mineColor: ""
        }
      ],
      selectedCell: null,
      mineQty: 51,
      rdmArr: [],
      clueArr: []
    };
  },
  methods: {
    ...mapMutations(["checkClicks"]),
    initBoard() {
      for (let i = 0; i <= this.cellNum; i++) {
        this.calcX++;

        if (this.calcX <= 15) {
          this.cells.push({
            x: this.calcX,
            y: this.calcY,
            isMined: false,
            surroundingMines: 0,
            clicks: 0,
            mineColor: ""
          });
        }
        if (this.calcX == 15 && this.calcY <= 14) {
          this.calcX = 0;
          this.calcY++;
          this.cells.push({
            x: this.calcX,
            y: this.calcY,
            isMined: false,
            surroundingMines: 0,
            clicks: 0,
            mineColor: ""
          });
        }
      }
      this.rdmMine(this.rdmArr);
      this.checkMine();

      for (let i = 0; i < this.cells.length - 1; i++) {
        this.clueNumbers(this.cells[i], i);
      }
    },
    clueNumbers(e, index) {
      if (!e.isMined) {
        if (e.clicks === 0) {
          let upLft = this.cells[index - 17];
          let upCtr = this.cells[index - 16];
          let upRgt = this.cells[index - 15];
          let lft = this.cells[index - 1];
          let rgt = this.cells[index + 1];
          let downLft = this.cells[index + 15];
          let downCtr = this.cells[index + 16];
          let downRgt = this.cells[index + 17];

          if (upLft != undefined && e.x !== 0 && e.y !== 0 && upLft.isMined) {
            e.surroundingMines++;
          }
          if (upCtr != undefined && e.y !== 0 && upCtr.isMined) {
            e.surroundingMines++;
          }
          if (upRgt != undefined && e.x !== 15 && e.y !== 0 && upRgt.isMined) {
            e.surroundingMines++;
          }
          if (lft != undefined && e.x !== 0 && lft.isMined) {
            e.surroundingMines++;
          }
          if (rgt != undefined && e.x !== 15 && rgt.isMined) {
            e.surroundingMines++;
          }
          if (
            downLft != undefined &&
            e.x !== 0 &&
            e.y !== 15 &&
            downLft.isMined
          ) {
            e.surroundingMines++;
          }
          if (downCtr != undefined && e.y !== 15 && downCtr.isMined) {
            e.surroundingMines++;
          }
          if (
            downRgt != undefined &&
            e.x !== 15 &&
            e.y !== 15 &&
            downRgt.isMined
          ) {
            e.surroundingMines++;
          }
        }
      }
    },
    checkMine() {
      let checkLoop = this.cells.forEach(e => {
        for (let i = 0; i < this.mineQty; i++) {
          let rdmArrX = this.rdmArr[i][0];
          let rdmArrY = this.rdmArr[i][1];

          if (e.x == rdmArrX && e.y == rdmArrY) {
            e.isMined = true;
          }
        }
      });
    },
    rdmMine(arr) {
      let searchForArr = (arr, position) => {
        let i, j, current;
        for (i = 0; i < arr.length; ++i) {
          if (position.length === arr[i].length) {
            current = arr[i];
            for (j = 0; position.length && position[j] === current[j]; ++j) {
              if (j === position.length) return i;
            }
          }
        }
        return -1;
      };

      let reAssign = (e, index) => {
        let rdm = this.cells[Math.floor(Math.random() * this.cellNum)];
        let position = [rdm.x, rdm.y];
        arr.splice(index, 1, position);
      };

      for (let i = 0; i < this.mineQty; i++) {
        let rdm = this.cells[Math.floor(Math.random() * this.cellNum)];
        let position = [rdm.x, rdm.y];
        arr.push(position);
      }

      arr.forEach((e, index) => {
        let dupArr = searchForArr(arr, e);
        if (dupArr !== index) {
          reAssign(e, index);
        }
      });
    },
    checkZero(cell, index) {
      let cellObj = cell;
      if (!cellObj.surroundingMines && !cellObj.isMined) {
        let upLft = this.cells[index - 17];
        let upCtr = this.cells[index - 16];
        let upRgt = this.cells[index - 15];
        let lft = this.cells[index - 1];
        let rgt = this.cells[index + 1];
        let downLft = this.cells[index + 15];
        let downCtr = this.cells[index + 16];
        let downRgt = this.cells[index + 17];
        let delay = 50;

        if (
          upLft != undefined &&
          cell.x !== 0 &&
          cell.y !== 0 &&
          upLft.clicks === 0
        ) {
          upLft.clicks++;
          setTimeout(
            () => this.checkZero(upLft, this.cells.indexOf(upLft)),
            delay
          );
        }
        if (upCtr != undefined && cell.y !== 0 && upCtr.clicks === 0) {
          upCtr.clicks++;
          setTimeout(
            () => this.checkZero(upCtr, this.cells.indexOf(upCtr)),
            delay
          );
        }
        if (
          upRgt != undefined &&
          cell.x !== 15 &&
          cell.y !== 0 &&
          upRgt.clicks === 0
        ) {
          upRgt.clicks++;
          setTimeout(
            () => this.checkZero(upRgt, this.cells.indexOf(upRgt)),
            delay
          );
        }
        if (lft != undefined && cell.x !== 0 && lft.clicks === 0) {
          lft.clicks++;
          setTimeout(() => this.checkZero(lft, this.cells.indexOf(lft)), delay);
        }
        if (rgt != undefined && cell.x !== 15 && rgt.clicks === 0) {
          rgt.clicks++;
          setTimeout(() => this.checkZero(rgt, this.cells.indexOf(rgt)), delay);
        }
        if (
          downLft != undefined &&
          cell.x !== 0 &&
          cell.y !== 15 &&
          downLft.clicks === 0
        ) {
          downLft.clicks++;
          setTimeout(
            () => this.checkZero(downLft, this.cells.indexOf(downLft)),
            delay
          );
        }
        if (downCtr != undefined && cell.y !== 15 && downCtr.clicks === 0) {
          downCtr.clicks++;
          setTimeout(
            () => this.checkZero(downCtr, this.cells.indexOf(downCtr)),
            delay
          );
        }
        if (
          downRgt != undefined &&
          cell.x !== 15 &&
          cell.y !== 15 &&
          downRgt.clicks === 0
        ) {
          downRgt.clicks++;
          setTimeout(
            () => this.checkZero(downRgt, this.cells.indexOf(downRgt)),
            delay
          );
        }
        return true;
      }
    },
    selectCell(id, index) {
      this.selectedCell = id;
      this.cells[index].clicks++;
      this.checkZero(this.cells[index], index);

      if (!this.cells[index].isMined) {
        this.$emit("next", this.cells[index]);
      }

      if (this.cells[index].isMined) {
        this.$emit("found", this.cells[index].clicks);
        this.playSound(require("../audio/underwater.wav"), 1);
      } else {
        this.playSound(require("../audio/bubble.wav"), 0.8);
      }

      this.checkClicks(this.cells[index].clicks);

      //Revisa qué jugador está activo para asignarle el color de la mina a cell.mineColor, y pasa como prop para la celda.
      if (this.activePlayer === "player1") {
        this.cells[index].mineColor = require("../assets/red-mine.svg");
      } else if (this.activePlayer === "player2") {
        this.cells[index].mineColor = require("../assets/blue-mine.svg");
      }
    },
    playSound(sound, volume) {
      if (sound) {
        var audio = new Audio(sound);
        audio.volume = volume;
        audio.play();
      }
    }
  },
  computed: {
    ...mapState(["activePlayer"])
  },
  beforeMount() {
    this.initBoard();
  }
};
</script>

<style>
.board {
  display: flex;
  flex-flow: row wrap;
  width: 64rem;
  height: 100%;
  box-sizing: border-box;
}

.mined {
  border: none;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  display: none;
  overflow: hidden;
}
</style>
