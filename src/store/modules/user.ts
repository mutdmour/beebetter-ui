/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Form, FormsState } from '../../index'
import { login } from '../../api/user'
import { ActionContext } from 'vuex'

declare interface User {
 email: string
}

declare interface UserState {
 user: null | User
}

const state: UserState = {
 user: null,
}

const getters = {
 isLoggedIn: (state: UserState): boolean => {
  return Boolean(state.user)
 },
}

const actions = {
 login: (
  context: ActionContext<any, unknown>,
  loginDetails: { username: string; password: string }
 ) => {
  login(loginDetails.username, loginDetails.password)
 },
}

const mutations = {}

export default {
 namespaced: true,
 state,
 getters,
 actions,
 mutations,
}
