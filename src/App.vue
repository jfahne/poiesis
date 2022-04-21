<template>
  <canvas ref="can" width="2000" height="2000"/>
</template>

<script>
import { fabric } from 'fabric'

export default {
  name: 'App',
  mounted() {
    const ref = this.$refs.can;
    const canvas = new fabric.Canvas(ref);
    const rect = new fabric.Rect({
      fill: 'red',
      width: 20,
      height: 20,
      opacity: 0.2,
    });
    const rect1 = new fabric.Rect({
      fill: 'blue',
      width: 20,
      height: 20,
      opacity: 1,
    });
    canvas.add(rect);
    canvas.add(rect1);
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
