<template>
  <div class="container">
    <button class="play-btn" @click="btnClicked">Play</button>
  </div>
</template>

<script>
export default {
  name: "PlayStep1",
  methods: {
    btnClicked() {
      this.$emit("playBtnClicked");
    }
  }
};
</script>

<style scoped>
.container {
  height: 100vh;
  width: 90%;
  position: relative;
}

.play-btn {
  padding: 2rem 8rem;
  font-weight: bold;
  font-size: 3rem;
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
</style>




