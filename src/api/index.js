
import fetch from 'isomorphic-fetch'
import queryString from 'query-string'

const Headers = global.Headers
const baseURL = '/api'
const url = (path) => `${baseURL}${path}`

export class Base {
  static get useCSRF () {
    return false
  }

  static async getToken () {
    if (Base._csrf != null) {
      return Promise.resolve(Base._csrf)
    } else {
      return Base.fetchToken()
    }
  }

  static async fetchToken () {
    const response = await fetch(url('/csrf'), {
      credentials: 'include'
    })
    const {data} = await response.json()
    Base._csrf = data.token
    return data.token
  }

  static async get (path, query) {
    const response = await fetch(url(`${path}?${queryString.stringify(query)}`), {
      credentials: 'include'
    })
    const data = await response.json()
    return data
  }

  static async _post (path, body = {}) {
    let response = await fetch(url(path), {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }),
      credentials: 'include',
      body: JSON.stringify(body)
    })
    return await response.json()
  }

  static async post (path, body = {}) {
    if (Base.useCSRF) {
      body._csrf = await Base.getToken()
      let response = await Base._post(path, body)
      if (response.code && response.code === 403) {
        body._csrf = await Base.fetchToken()
        return await Base._post(path, body)
      } else {
        return response
      }
    } else {
      return Base._post(path, body)
    }
  }

  static async put (path, body = {}) {
    body._method = 'PUT'
    return Base.post(path, body)
  }

  static async delete (path, body = {}) {
    body._method = 'DELETE'
    return Base.delete(path, body)
  }
}

export class Account {
  static async login (name, password) {
    return Base.post('/login', {name, password})
  }

  static async signup (name, password) {
    return Base.post('/signup', {name, password})
  }

  static async session () {
    return Base.get('/session')
  }

  static async logout () {
    return Base.post('/logout')
  }
}

export class Chat {
  static findUsers (query) {
    return Base.get('/users', {q: query})
  }
}

function CRUD (base) {
  return class CRUD {
    static async get (query) {
      return Base.get(`${base}`, query)
    }

    static async getByID (id, query) {
      return Base.get(`${base}/${id}`, query)
    }

    static async create (body) {
      return Base.post(`${base}`, body)
    }

    static async edit (body) {
      return Base.put(`${base}/${body.id}`, body)
    }

    static async delete (id) {
      return Base.deleteJSON(`${base}/${id}`)
    }
  }
}

export function handleResponse (response, emitter, fn) {
  if (response.code === 403) {
    emitter.emit('user::logout')
  } else {
    fn()
  }
}

