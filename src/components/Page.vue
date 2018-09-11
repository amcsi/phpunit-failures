<template>
  <div class="container">
    <h1>PhpUnit Failures</h1>

    <p>
      This web app lets you paste the output of test failures in PhpUnit, and it gives you scripts with which you can
      rerun just those test which have failed.
    </p>

    <div class="columns">
      <div class="test-output">
        <h3>Paste test failures output here:</h3>
        <div class="test-output__textarea-container">
          <textarea class="test-output__textarea" :value="testOutput" rows="20"
            @input="$emit('update:testOutput', $event.target.value)"></textarea>
          <div
              v-show="!testOutput"
              class="test-output__textarea__multiline-placeholder"
              v-html="failuresPlaceholder"
          ></div>
        </div>
      </div>
      <div class="results">
        <h3>Results ({{ matches.count || 0 }} test methods):</h3>

        <div :class="{ 'without-test-output': !testOutput }">
          <div class="files">
            <h4>List of files:</h4>
            <textarea
                rows="5"
                class="files__textarea look-disabled"
                v-model="matches.files"
                @keypress.prevent
                @paste.prevent
            ></textarea>
          </div>
          <div class="phpstorm-command">
            <h4>PhpStorm Test Runner options:</h4>
            <input class="phpstorm-command__input look-disabled"
              @keypress.prevent @paste.prevent
              :value="matches.phpstormCommand">
          </div>
          <div class="cli-command">
            <h4>CLI command:</h4>
            <input class="cli-command__input look-disabled" :value="matches.cliCommand" @keypress.prevent @paste.prevent>
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
    data() {
      return {
        failuresPlaceholder: `PHPUnit 3.4.13 by Sebastian Bergmann.

F

Time: 0 seconds, Memory: 5.75Mb

There was 1 failure:

1) TestSimpleMultiplier::test_multiply_simple
Multiplying 2 and 3 did not return 6
Failed asserting that <6> matches expected <7>.

.../testMessage.php:23

FAILURES!
Tests: 1, Assertions: 1, Failures: 1.
`,
      };
    },
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
    flex: 2;
    display: flex;
    flex-direction: column;
  }
  .test-output__textarea-container {
    flex: 1;
    position: relative;
  }
  .test-output__textarea {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid gray;
    padding: .5em;
    white-space: nowrap;
    font-size: 1rem;
  }

  .test-output__textarea__multiline-placeholder {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid transparent;
    padding: .5em;
    white-space: pre;
    text-align: left;
    font-family: monospace;
    font-size: 1rem;
    opacity: .5;
  }
  .results {
    flex: 1;
  }
  .files {
  }
  .files__textarea {
    overflow: scroll;
    width: 100%;
    white-space: nowrap;
  }
  .phpstorm-command {
  }
  .phpstorm-command__input {
    width: 100%;
  }
  .cli-command {
  }
  .cli-command__input {
    width: 100%;
  }
  .without-test-output {
    opacity: .2;
  }
</style>

