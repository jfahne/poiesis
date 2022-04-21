<template>
    <input type="file" accept="image/*" @change="onChange" />
    <canvas ref="can"></canvas>
</template>

<script>
import { fabric } from 'fabric';
import BoundingBox from '../assets/BoundingBox.js'

export default {
  name: 'imageUpload',
  props: {
      canW: {
          type: [String,Number],
          required: true
      },
      canH: {
          type: [String,Number],
          required: true
      },
  },
  data() {
    return {
      item:{
          image : null,
          imageUrl: null
      },
      canvas: null,
      boundingO: {
        x: 0,
        y: 0,
      }
    }
  },
  mounted() {
      this.canvas = new fabric.Canvas(this.$refs.can, {selection: false});
      this.canvas.setDimensions({width: this.canW, height: this.canH});
  },
  methods: {
    onChange(e) {
      const file = e.target.files[0];
      this.image = file;
      this.item.imageUrl = URL.createObjectURL(file);
      this.canvas.setBackgroundImage(this.item.imageUrl, this.canvas.renderAll.bind(this.canvas))
      BoundingBox(this.canvas);
    },
  },

} 
</script>
// Some inspiration from https://stackoverflow.com/questions/47650154/how-do-i-upload-image-in-vuejs