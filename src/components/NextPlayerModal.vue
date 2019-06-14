<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <span class="modal-title">{{ this.activePlayer }}'s turn</span>
            </slot>
          </div>

          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Next-player-modal",
  props: {
    activePlayer: String
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
  margin-top: 3rem;
  padding: 1rem 20rem;
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

.btn:hover {
  border: 0.3rem #f76c6c solid;
  color: #f76c6c;
}

.btn:active {
  box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.3);
  background-color: #24305e;
  color: white;
  border: 0.3rem white solid;
}

.modal-title {
  font-size: 7rem;
  color: white;
}
</style>

