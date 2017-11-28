
import nanobus from 'nanobus'
import nanotiming from 'nanotiming'
import nanorouter from 'nanorouter'
import nanohref from 'nanohref'
import nanolocation from 'nanolocation'
import nanoquery from 'nanoquery'
import scrollToAnchor from 'scroll-to-anchor'
import domready from 'document-ready'

export default function nanoapp (opts = {}) {

  const state = {}
  let loaded = false
  let history = {}

  const bus = nanobus('choo.emit')
  const router = nanorouter(opts.router)

  const events = {
    DOMCONTENTLOADED: 'dom-content-loaded',
    NAVIGATE: 'navigate',
    POPSTATE: 'pop-state',
    PUSHSTATE: 'push-state',
    REPLACESTATE: 'replace-state',
    RENDER: 'render'
  }
  state.events = events

  return {
    mount (selector) {
      const root = document.querySelector(selector)
      Object.defineProperty(state, 'root', {
        get () {return root},
        enumerable: false
      })
    },

    route (path, fn) {
      router.on(path, (params) => {
        state.route = path
        state.params = params
        const routeTiming = nanotiming(`route(${path})`)
        fn(state, bus.emit.bind(bus))
        routeTiming()
      })
    },

    use (fn) {
      const useTiming = nanotiming('use')
      fn(state, bus, this)
      useTiming()
    },

    start () {
      bus.prependListener(events.DOMCONTENTLOADED, () => {
        loaded = true
      })

      bus.prependListener(events.NAVIGATE, () => {
        state.query = nanoquery(window.location.search)
        if (loaded) {
          bus.emit(events.RENDER)
          setTimeout(scrollToAnchor.bind(null, window.location.hash), 0)
        }
      })

      bus.prependListener(events.POPSTATE, () => bus.emit(events.NAVIGATE))

      bus.prependListener(events.PUSHSTATE, (href) => {
        window.history.pushState(history, null, href)
        bus.emit(events.NAVIGATE)
      })

      bus.prependListener(events.REPLACESTATE, (href) => {
        window.history.replaceState(history, null, href)
        bus.emit(events.NAVIGATE)
      })

      window.onpopstate = function () {
        bus.emit(events.POPSTATE)
      }

      nanohref((location) => {
        const href = location.href
        const currentHref = window.location.href
        if (href === currentHref) {
          return
        } else {
          bus.emit(events.PUSHSTATE, href)
        }
      })

      state.href = nanolocation()
      state.query = nanoquery(window.location.search)

      bus.prependListener(events.RENDER, () => {
        const renderTiming = nanotiming(events.RENDER)
        state.href = nanolocation()
        router(state.href)
        renderTiming()
      })
      bus.emit(events.RENDER)

      domready(() => bus.emit(events.DOMCONTENTLOADED))
    }
  }
}

