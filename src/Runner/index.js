import Component from './Component'

export default {
  name: 'Runner',
  props: {
    code: {
      type: String,
      default: ''
    },
    context: {
      type: Object,
      default: () => ({})
    },
    mixin: {
      type: Object,
      default: () => ({})
    },
    renderProps: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      component: null
    }
  },
  // watch: {
  //   code: {
  //     immediate: true,
  //     handler() {
  //       this.run();
  //     }
  //   }
  // },
  beforeMount () {
    this.renderCode()
  },
  destroyed () {
    this.destroyCode()
  },
  methods: {
    run () {
      this.$nextTick(() => {
        this.destroyCode()
        this.renderCode()
      })
    },
    renderCode () {
      const { context, mixin } = this
      const component = new Component(this.code, {
        context,
        mixins: [mixin]
      })
      component.compile()

      this.component = component
    },
    destroyCode () {
      // eslint-disable-next-line no-unused-expressions
      this.component && this.component.destroy()
      this.component = null
    }
  },
  render (h) {
    return h(this.component && this.component.com, {
      attrs: this.renderProps
    })
  }
}
