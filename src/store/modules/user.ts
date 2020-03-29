/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Form, FormsState } from '../../index'
import { login } from '../../api/user'
import { ActionContext } from 'vuex'
import { isUserIdCookieSet } from '../../utils/helpers'

declare interface UserState {
 loggedIn: boolean
}

const state: UserState = {
 loggedIn: isUserIdCookieSet(),
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
     resolve()
    })
    .catch(() => {
     reject()
    })
    .finally(() => {
     context.commit('updateLogInStat')
    })
  })
 },
}

const mutations = {
 updateLogInState: (state: UserState) => {
  state.loggedIn = isUserIdCookieSet()
 },
}

export default {
 namespaced: true,
 state,
 getters,
 actions,
 mutations,
}
