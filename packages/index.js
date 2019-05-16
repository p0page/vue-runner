import component from './runner'

const COMPONENT_NAME = 'Runner'

const install = (Vue) => {
  if (install.installed) {
    return
  }
  Vue.component(COMPONENT_NAME, component)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  component
}
