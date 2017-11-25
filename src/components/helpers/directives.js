
import {directive} from 'lit-html'

export function conditional (condition, el) {
  return directive((part) => {
    if (condition) {
      return el
    }
  })
}

