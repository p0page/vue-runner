class Context {
  constructor (component, elt) {
    this.component = component
    this.elt = elt
  }

  getContent () {
    return this.elt.innerHTML
  }

  setContent (val) {
    this.elt.innerHTML = val
  }
}

export class StyleContext extends Context {
  scopeStyles (elt, scopeName) {
    const { sheet } = elt
    const rules = sheet.cssRules

    const result = []
    for (let i = 0; i < rules.length; i += 1) {
      const rule = rules[i]
      if (rule.type !== 1) return ''

      const scopedSelectors = rule.selectorText.split(/\s*,\s*/).reduce((selectors, sel) => {
        selectors.push(`${scopeName} ${sel}`)
        const segments = sel.match(/([^ :]+)(.+)?/)
        selectors.push(`${segments[1]}${scopeName}${segments[2] || ''}`)
        return selectors
      }, [])

      const scopedRule = `${scopedSelectors.join(',')}${rule.cssText.substr(rule.selectorText.length)}`
      result.push(scopedRule)
    }

    return result.join('')
  }

  compile () {
    const scopeId = this.component.getScopeId()

    const styleElt = document.createElement('style')

    styleElt.type = 'text/css'
    styleElt.id = scopeId
    styleElt.innerHTML = this.scopeStyles(this.elt, `[${scopeId}]`)

    this.component.getHead().appendChild(styleElt)
  }

  destroy () {
    const scopeId = this.component.getScopeId()

    if (scopeId !== '') {
      const target = document.getElementById(scopeId)
      if (target) target.parentNode.removeChild(target)
    }
  }
}

export class ScriptContext extends Context {
  constructor (component, elt, ctx = {}, mixins = []) {
    super(component, elt)
    this.ctx = ctx
    this.mixins = mixins
    this.exports = {}

    this.getExports()
  }

  injectMixins () {
    let _mixins = this.mixins
    if (Array.isArray(this.exports.mixins)) {
      _mixins = _mixins.concat(this.exports.mixins)
    }
    this.exports.mixins = _mixins
  }

  getExports () {
    const keys = Object.keys(this.ctx)
    const values = keys.map(key => this.ctx[key])
    const content = this.getContent()
    // eslint-disable-next-line no-new-func
    this.exports = new Function(...keys, content.replace(/export( )+default/, 'return'))(...values)
    this.injectMixins()
  }
}

export class TemplateContext extends Context {
  getRootElt () {
    let tplElt = this.elt.content || this.elt

    if ('firstElementChild' in tplElt) {
      return tplElt.firstElementChild
    }

    for (tplElt = tplElt.firstChild; tplElt !== null; tplElt = tplElt.nextSibling) {
      if (tplElt.nodeType === Node.ELEMENT_NODE) return tplElt
    }

    return null
  }
}
