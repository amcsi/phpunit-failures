<template>
  <div id="app">
    <router-view :testOutput.sync="testOutput" />
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        testOutput: '',
      };
    }
  };
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 100%;
}
  body {
    min-height: 100%;
  }
  html {
    min-height: 100%;
  }
</style>
