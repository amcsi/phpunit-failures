<template>
  <div class="container">
    <div class="columns">
      <div class="test-output">
        <textarea v-model="testOutput"></textarea>
      </div>
      <div class="results">
        <div class="files"><pre>{{files}}</pre></div>
        <div class="cli-command">c</div>
        <div class="phpstorm-command">d</div>
      </div>
    </div>
  </div>
</template>
<script>
  /** @class Page */
  export default {
    data() {
      return {
        testOutput: '',
      };
    },
    methods: {
      onTestOutputChange() {
      },
    },
    computed: {
      files() {
        const pattern = /\s+\d+\) ([\w\\\\:]+)/g;
        let ret = '';
        let match;
        // eslint-disable-next-line no-cond-assign
        while ((match = pattern.exec(this.testOutput)) !== null) {
          ret += `${match[1]}\n`;
        }
        return ret;
      },
    },
    components: {},
  };
</script>
<style>
  body {
    height: 100%;
  }
  .container {
    height: 100%;
  }
  .columns {
    background-color: aqua;
    display: flex;
    height: 100%;
  }
  .test-output {
    flex: 1;
    background-color: coral;
  }
  .results {
    max-width: 800px;
    min-width: 400px;
    background-color: blue;
  }
  .files {
    background-color: cyan;
  }
  .cli-command {
    background-color: lightblue;
  }
  .phpstorm-command {
    background-color: maroon;
  }
</style>

