/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Form, FormsState } from '../../index'
import { login } from '../../api/user'
import { ActionContext } from 'vuex'

declare interface UserState {
 loggedIn: boolean
}

const state: UserState = {
 loggedIn: true,
}

const getters = {
 isLoggedIn: (state: UserState): boolean => {
  return state.loggedIn
 },
}

const actions = {
 login: (
  context: ActionContext<any, unknown>,
  loginDetails: { username: string; password: string }
 ) => {
  return new Promise((resolve, reject) => {
   login(loginDetails.username, loginDetails.password)
    .then(() => {
     context.commit('setLogIn', true)
     resolve()
    })
    .catch(() => {
     context.commit('setLogIn', false)
     reject()
    })
  })
 },
}

const mutations = {
 setLogIn: (state: UserState, loggedIn: boolean) => {
  state.loggedIn = loggedIn
 },
}

export default {
 namespaced: true,
 state,
 getters,
 actions,
 mutations,
}
