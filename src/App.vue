<template>
  <UploadButton :canW=2000 :canH=2000> </UploadButton>
</template>

<script>
import UploadButton from './components/UploadButton.vue'

export default {
  name: 'App',
  components: {
    UploadButton
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
