<template>
    <input type="file" accept="image/*" @change="uploadFile" />
    <button @click="onBoundingBoxActive"> Bounding Box </button>
    <button @click="logCanvasData"> Log Canvas </button>
    <button @click="undoHistory"> Undo </button>
    <button @click="redoHistory"> Redo </button>
    <canvas ref="can"></canvas>
</template>

<script>
import { fabric } from 'fabric';
import BoundingBox from '../assets/BoundingBox.js'
import History from '../assets/StateStore.js'

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
      boundingBoxActive: false,
      bgSet: false,
    }
  },
  mounted() {
      this.canvas = new fabric.Canvas(this.$refs.can, {selection: false});
      this.canvas.setDimensions({width: this.canW, height: this.canH});
      this.history = new History();
  },
  methods: {
    turnOffListeners() {
      if (this.boundingBoxActive) {
        this.boundingBoxActive = !this.boundingBoxActive;
      }
      this.canvas.off('mouse:down').off('mouse:move').off('mouse:up');
    },
    updateHistory() {
      this.canvas.renderAll();
      console.log(JSON.stringify(this.canvas));
      this.history.push(JSON.stringify(this.canvas));
    },
    undoHistory() {
      this.turnOffListeners();
      this.canvas.loadFromJSON(this.history.undo());
    },
    redoHistory() {
      this.turnOffListeners();
      this.canvas.loadFromJSON(this.history.redo());
    },
    uploadFile(e) {
      const file = e.target.files[0];
      const canvas = this.canvas;
      this.item.image = file;
      this.item.imageUrl = URL.createObjectURL(file);
      fabric.Image.fromURL(this.item.imageUrl, function(img) {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: (img.width > img.height ? canvas.width/img.width : canvas.height/img.height),
          scaleY: (img.width > img.height ? canvas.width/img.width : canvas.height/img.height),
      });
      });
      this.canvas.renderAll();
      this.bgSet = 1;
    },
    onBoundingBoxActive() {
      if (this.bgSet) {
        this.updateHistory();
        this.bgSet = !this.bgSet;
      }
      this.boundingBoxActive = !this.boundingBoxActive;
      BoundingBox(this.canvas, this.boundingBoxActive, this.history);   
    },
    logCanvasData() {
      console.log(JSON.stringify(this.canvas));
    }
  },

} 
</script>