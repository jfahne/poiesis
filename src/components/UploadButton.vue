<template>
    <div class="container " :class="(mode === 'dark')?'dark':'light'">
      <div class="col">
         <div class="navBar " >
            <VueWriter :array="arr" :typeSpeed="100" :eraseSpeed="70"  :delay="2000"/>
            <div class="something" :class="(mode === 'dark')?'dark':'light'">
            <button :class="(mode === 'dark')?'dark-mode-button-dark':'dark-mode-button-light'" @click="changeMode">
            <span v-if="mode==='light'"><font-awesome-icon icon='sun' size="3x"/></span>
            <span v-else><font-awesome-icon icon='moon' color="rgba(255,255,255,.8)" size="3x"/></span></button>     
        </div>
    </div>
      <div class="row">
             <div class="graph horizontal-container" :class="(mode === 'dark')?'dark-container':'light-container'">
                <h3>Outline</h3>
              </div>
              <div class="col">
                  <div class="row">
                     <div class="upload horizontal-container" :class="(mode === 'dark')?'dark-container':'light-container'">
                        <h3>Upload your graph</h3>
                        <input class="upload-button" type="file" accept="image/*" @change="uploadFile"/>
                      </div>
                      <div class="undoRedo horizontal-container" :class="(mode === 'dark')?'dark-container':'light-container'">
                        <h3>Functional Bar</h3>
                        <div class="button-group" :class="(mode==='dark')?'button-dark':'button-light'">
                          <button @click="undoHistory"> Undo </button>
                          <button @click="redoHistory"> Redo </button>
                          <button @click="onBoundingBoxActive"> Bounding Box </button>
                          <button @click="logCanvasData"> Log Canvas </button>
                        </div>
                      </div>
                  </div>
                  <div class="horizontal-container min-height" :class="(mode === 'dark')?'dark-container':'light-container'">
                    <h3>Graph</h3>
                    <canvas ref="can"></canvas>
                  </div>
              </div>
      </div>
      </div>
    </div>
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
     mode:"light",
     arr: ["Poiesis", "ποίησις"],
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
    changeMode(){
      if(this.mode==="dark"){
        this.mode="light"
      }else{
        this.mode="dark"
      }
      console.log(this.mode)
    },
    turnOffListeners() {
      if (this.boundingBoxActive) {
        this.boundingBoxActive = !this.boundingBoxActive;
      }
      this.canvas.off('mouse:down').off('mouse:move').off('mouse:up');
    },
    // cursor(el){
    //   gsap.to(el,{opacity:0,ease:"power2.inOut",repeat:-1})
    // },
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
      this.item.image = file;
      this.item.imageUrl = URL.createObjectURL(file);
      
      
      this.canvas.setBackgroundImage(this.item.imageUrl,this.canvas.renderAll.bind(this.canvas));
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