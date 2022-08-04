<template>
  <AnnotationEditor :canW=1000 :canH=1000> </AnnotationEditor>
</template>

<script>
import AnnotationEditor from './components/AnnotationEditor.vue'

export default {
  name: 'App',
  components: {
    AnnotationEditor,
  },
  mounted() {
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
