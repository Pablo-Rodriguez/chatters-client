
export default (view) => {
  return (state, emit) => {
    if (state.user.logged) {
      return view(state, emit)
    } else {
      emit('user::requires-login')
    }
  }
}

