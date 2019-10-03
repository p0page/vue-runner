import Vue from 'vue'
import { TemplateContext, ScriptContext, StyleContext } from './Context'

let scopeIndex = 0

class Component {
  constructor (code, options = {}) {
    this.initData()
    this.parse(code, options)
  }

  initData () {
    this.template = null
    this.script = null
    this.styles = []
    this.com = null
    this._scopeId = ''
  }

  getHead () {
    return document.head || document.getElementsByTagName('head')[0]
  }

  getScopeId () {
    if (this._scopeId === '') {
      // eslint-disable-next-line no-plusplus
      this._scopeId = `data-s-${(scopeIndex++).toString(36)}${Date.now()}`
      this.template.getRootElt().setAttribute(this._scopeId, '')
    }
    return this._scopeId
  }

  parse (code, options) {
    const { context = {}, mixins = [] } = options

    const doc = document.implementation.createHTMLDocument('')
    doc.body.innerHTML = code

    for (let it = doc.body.firstChild; it; it = it.nextSibling) {
      switch (it.nodeName) {
        case 'TEMPLATE':
          this.template = new TemplateContext(this, it)
          break
        case 'SCRIPT':
          this.script = new ScriptContext(this, it, context, mixins)
          break
        case 'STYLE':
          this.styles.push(new StyleContext(this, it))
          break
        default:
          break
      }
    }
  }

  // _normalizeSection(eltCx) {
  //   var lang = eltCx.elt.getAttribute('lang');
  //   eltCx.elt.removeAttribute('lang');
  //   return langProcessor[lang.toLowerCase()]
  // }

  compile () {
    this.styles.forEach(style => style.compile())

    const options = {
      ...this.script.exports,
      template: this.template.getContent()
    }
    this.com = Vue.extend(options)
  }

  destroy () {
    this.styles.forEach(style => style.destroy())
    this.initData()
  }
}

export default Component
