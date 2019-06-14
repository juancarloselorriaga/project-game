import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const initialState= () => {
  return{
    p1: '',
    p2: '',
    gameStatus: false,
    lastCellClicks: 0,
    activePlayer: '',
    whoWon: ''
  }
}

export default new Vuex.Store({
  state: 
  {
    p1: '',
    p2: '',
    gameStatus: false,
    lastCellClicks: 0,
    activePlayer: '',
    whoWon: ''
  },
  mutations: {
    assignPlayer1 (state, player1) {
      return state.p1 = player1;
    },
    assignPlayer2 (state, player2) {
      return state.p2 = player2;
    },
    startGame(state){
      return state.gameStatus = true;
    },
    checkClicks(state, clicksReceived){
      return state.lastCellClicks = clicksReceived;
    },
    whoIsPlaying(state, activePlayer){
      return state.activePlayer = activePlayer;
    },
    won(state, player){
      return state.whoWon = player
    },
    reset(state){
      state.lastCellClicks = 0;
      state.activePlayer = '';
      state.whoWon = '';
    },
    resetPlayers(state){
      state.p1 = '',
      state.p2 = '',
      state.gameStatus = false
    }
  },
  actions: {

  }
})
