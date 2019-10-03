<template>
    <section class="container">
      <header class="header">
        <button class="btn" @click="handleRun">运行</button>
      </header>
      <main class="main">
        <div class="editor">
          <codemirror
            ref="editor"
            v-model="code"
            :options="options"
          />
        </div>
        <div class="divider" />
        <div class="runner">
          <runner
            ref="runner"
            :code="code"
          />
        </div>
      </main>
    </section>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite'
import 'codemirror/mode/vue/vue'
import Runner from '../src'

export default {
  name: 'Example',
  components: {
    codemirror,
    Runner
  },
  data () {
    return {
      // eslint-disable-next-line no-useless-escape
      code: '<template>\n\t<div class="msg">{{ msg }}</div>\n</template>\n\n<script>\nexport default {\n\tdata () {\n\t\treturn {\n\t\t\tmsg: \'Hello Runner\'\n\t\t}\n\t}\n}\n<\/script>\n\n<style>\n.msg {\n\tcolor: blue;\n}\n</style>',
      options: {
        mode: 'vue',
        tabSize: 2,
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: { 'Ctrl-Space': 'autocomplete' }
      }
    }
  },
  methods: {
    handleRun () {
      this.$refs.runner.run()
    }
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
  }
  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    flex-basis: auto;
    box-sizing: border-box;
    min-height: 100vh;
    .header {
      display: block;
      box-sizing: inherit;
      height: 60px;
      flex-shrink: 0;
      box-shadow: 0 1px 3px rgba(26,26,26,.1);
      position: relative;
      z-index: 1000;
      .btn {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        font-weight: 500;
        user-select: none;
        padding: 6px 12px;
        font-size: 12px;
        border-radius: 12px;
        margin: 17px 0 0 20px;
      }
    }
    .main {
      display: block;
      box-sizing: inherit;
      flex: 1;
      overflow: auto;
      flex-basis: auto;
      position: relative;
      .divider {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        width: 6px;
        height: 100%;
        background: #f8f8f9;
        box-sizing: border-box;
        border: 1px solid #dcdee2;
        border-top: none;
        border-bottom: none;
      }
      .editor, .runner {
        position: absolute;
        top: 0;
        bottom: 0;
      }
      .editor {
        left: 0;
        right: 50%;
        .CodeMirror {
          height: auto;
        }
      }
      .runner {
        right: 0;
        left: 50%;
        padding-left: 6px;
      }
    }
  }
</style>
