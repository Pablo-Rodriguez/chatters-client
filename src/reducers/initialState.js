
export default {
  user: {
    logged: false,
    loading: false,
    error: null,
    message: null,
    data: null
  },
  chat: {
    users: [],
    call: {
      calling: false,
      init: false,
      to: null,
      from: null,
      selectedCanvas: 'self',
      messages: []
    }
  }
}
