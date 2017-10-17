<template>
  <div class="container">
    <div class="columns">
      <div class="test-output">
        <h3>Paste test failures output here:</h3>
        <textarea class="test-output__textarea" :value="testOutput"
          @input="$emit('update:testOutput', $event.target.value)"></textarea>
      </div>
      <div class="results">
        <h3>Results ({{ matches.count || 0 }} test methods):</h3>

        <div class="files">
          <h4>List of files:</h4>
          <textarea class="files__textarea look-disabled" v-model="matches.files"></textarea>


        </div>
        <div class="phpstorm-command">
          <h4>PhpStorm Test Runner options:</h4>
          <input class="phpstorm-command__input look-disabled"
            :value="matches.phpstormCommand">
        </div>
        <div class="cli-command">
          <h4>CLI command:</h4>
          <input class="cli-command__input look-disabled" :value="matches.cliCommand">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /** @class Page */
  export default {
    props: ['testOutput'],
    computed: {
      matches() {
        const pattern = /\s+\d+\) ([\w\\\\:]+)/g;
        let ret = '';
        let match;
        const matches = [];
        // eslint-disable-next-line no-cond-assign
        while ((match = pattern.exec(this.testOutput)) !== null) {
          matches.push(match[1]);
        }
        const escapeBackslahes = input => input.replace(/\\/g, '\\\\');
        const phpstormCommand = matches.length ?
          `--filter="/^(${escapeBackslahes(matches.join('|'))})/"` :
          '';
        matches.sort();
        return {
          count: matches.length,
          files: matches.join("\n"),
          phpstormCommand,
          cliCommand: phpstormCommand ? `phpunit ${escapeBackslahes(phpstormCommand)}` : '',
        }
      },
    },
    components: {},
  };
</script>
<style>
  .look-disabled {
    color: rgb(84, 84, 84);
    background-color: rgb(235, 235, 228);
  }
  body {
    height: 100%;
  }
  .container {
    height: 100%;
  }
  .columns {
    display: flex;
    height: 100%;
  }
  .test-output {
    flex: 1;
  }
  .test-output__textarea {
    min-width: 600px;
    min-height: 600px;
    white-space: nowrap;
   }
  .results {
    max-width: 800px;
    min-width: 400px;
  }
  .files {
  }
  .files__textarea {
    overflow: scroll;
    min-width: 800px;
    min-height: 300px;
    white-space: nowrap;
  }
  .phpstorm-command {
  }
  .phpstorm-command__input {
    min-width: 800px;
  }
  .cli-command {
  }
  .cli-command__input {
    min-width: 800px;
  }
</style>

