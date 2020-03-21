// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Form, FormsState } from '../../index'
// import { getForms, updateForm } from '../../api/forms'
// import { ActionContext } from 'vuex'

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

const actions = {}

const mutations = {}

export default {
 namespaced: true,
 state,
 getters,
 actions,
 mutations,
}
