<template>
  <div class="container">
    <div class="tile is-ancestor columns">
      <div class="tile is-vertical is-6 test-output">
        <h3>PHPUnit failure output</h3>
        <h4>Paste here:</h4>
        <textarea class="textarea test-output__textarea" :value="testOutput"
          @input="$emit('update:testOutput', $event.target.value)"></textarea>
      </div>
      <div class="tile is-vertical is-6 is-parent results">
        <h3>Results ({{ matches.count || 0 }} test methods)</h3>

        <div class="tile is-child files">
          <h4>List of files:</h4>
          <textarea class="textarea files__textarea look-disabled" v-model="matches.files"></textarea>


        </div>
        <div class="tile is-child phpstorm-command">
          <h4>PhpStorm Test Runner options:</h4>
          <input class="phpstorm-command__input look-disabled"
            :value="matches.phpstormCommand">
        </div>
        <div class="tile is-child cli-command">
          <h4>CLI command:</h4>
          <input class="cli-command__input look-disabled" :value="matches.cliCommand">
        </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { convertMatchesToPhpStormArgument, getMatches } from '../converter';

/** @class Page */
export default {
    props: ['testOutput'],
    computed: {
      matches() {
        const matches = getMatches(this.testOutput);
        const escapeBackslahes = input => input.replace(/\\/g, '\\\\');
        const phpstormCommand = convertMatchesToPhpStormArgument(matches);
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
<style lang="scss">
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
    &__textarea {
      width: 100%;
      min-height: 600px;
      white-space: nowrap;
    }
  }
  .results {
  }
  .files {
    &__textarea {
      width: 100%;
      min-height: 300px;
      white-space: nowrap;
    }
  }
  .phpstorm-command {
    &__input {
      width: 100%;
    }
  }
  .cli-command {
    &__input {
      width: 100%;
    }
  }
</style>

