<template>
    <div ref="tree"></div>
</template>

<script>
import { d3 } from 'd3';

export default {
  name: 'annotationTree',
  props: ['treeJSON'],
  data() {
    return {}
  },
  mounted() {
    this.displayTree();
  },
  methods: {
    displayTree() {
      let margin = {top: 10, right: 10, bottom: 10, left: 10};
      let w = 1000;
      let h = 1000;
      const svg = d3.select(this.$refs.tree).
        append("svg").
        attr("width", w).
        attr("height", h).
        append("g").
        attr("transform", `transform(${margin.left}, ${margin.top})`);
        
    }
  },
} 
</script>