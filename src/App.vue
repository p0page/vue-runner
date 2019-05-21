<template>
  <div id="app">
    <codemirror
      ref="editor"
      class="editor"
      v-model="code"
      :options="options"
    />
    <runner
      class="runner"
      :code="code"
      :mixin="mixinFunc"
    />
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite'
import 'codemirror/mode/vue/vue'
import Hello from './Hello'

export default {
  name: 'app',
  components: {
    codemirror
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
    mixinFunc () {
      return {
        data () {
          return {
            name: 'Runner'
          }
        },
        components: {
          Hello
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  .editor, .runner {
    width: 50%;
    float: left;
  }
}

</style>
