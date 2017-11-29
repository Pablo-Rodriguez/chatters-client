
import {directive} from 'lit-html'

export function conditional (condition, trueEl, falseEl) {
  return directive((part) => {
    if (condition) {
      return trueEl
    } else {
      if (falseEl != null) {
        return falseEl
      }
    }
  })
}

