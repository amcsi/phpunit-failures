<template>
  <div class="container">
    <div class="columns">
      <div class="test-output">
        <textarea :value="testOutput" @input="$emit('update:testOutput', $event.target.value)"></textarea>
      </div>
      <div class="results">
        <div class="files"><pre>{{ matches.files }}</pre></div>
        <div class="phpstorm-command">{{ matches.phpstormCommand }}</div>
        <div class="cli-command"><pre>{{ matches.cliCommand }}</pre></div>
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
        const phpstormCommand = `--filter="/^(${escapeBackslahes(matches.join('|'))})/"`;
        matches.sort();
        return {
          files: matches.join("\n"),
          phpstormCommand,
          cliCommand: `phpunit ${escapeBackslahes(phpstormCommand)}`,
        }
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

