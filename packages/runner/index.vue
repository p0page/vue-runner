<template lang="pug">
  .runner
    button(@click="renderCode") Run
    render(:render="renderFunc")
</template>

<script>
/* eslint-disable no-new-func */
import Vue from 'vue'
import Render from './render'
import { getTagValue, createId } from './util'

export default {
  name: 'Runner',
  components: {
    Render
  },
  props: {
    code: {
      type: String,
      default: ''
    },
    mixin: {
      type: [Object, Function],
      default: () => {}
    }
  },
  data () {
    return {
      component: null,
      id: null,
      template: '',
      script: '',
      style: ''
    }
  },
  computed: {
    renderFunc () {
      return h => h(this.component)
    },
    _mixin () {
      const { mixin } = this
      if (typeof mixin === 'function') {
        return mixin()
      } else if (typeof mixin === 'object') {
        return { ...mixin }
      }
      return {}
    }
  },
  mounted () {
    this.renderCode()
  },
  methods: {
    renderCode () {
      const { code, makeComponent, parse, clearStyle, createStyle } = this
      const { template, script, style } = parse(code)
      if (template !== this.template || script !== this.script) {
        makeComponent(script, template)
      }
      if (style !== this.style) {
        clearStyle()
        this.id = createId()
        createStyle(this.id, style)
      }
      this.template = template
      this.script = script
      this.style = style
    },
    // 生成style元素
    createStyle (id, style) {
      const styleElement = document.createElement('style')
      styleElement.type = 'text/css'
      styleElement.id = id
      styleElement.innerHTML = style
      document.getElementsByTagName('head')[0].appendChild(styleElement)
    },
    // 删除上一次渲染生成的style元素
    clearStyle () {
      const { id } = this
      if (!id) {
        return
      }
      const target = document.getElementById(id)
      if (target) {
        target.parentNode.removeChild(target)
      }
    },
    parse (code) {
      // const elementId = `data-${id}`
      const template = getTagValue(code, 'template')
      const script = getTagValue(code, 'script').replace(/export( )+default/, 'return')
      const style = getTagValue(code, 'style')
      return { template, script, style }
    },
    makeComponent (script, template = '') {
      const options = new Function(script)()
      this.component = Vue.extend({ ...options, template, mixins: [this._mixin] })
    }
  }
}
</script>
