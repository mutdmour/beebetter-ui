import { Form, FormsState } from '../../index'
import { getForms } from '../../api/forms'

const state = {
 forms: [],
}

const getters = {}

const actions = {
 getAllForms: (context: any) => {
  getForms((forms: Form[]) => {
   context.commit('setForms', forms)
  })
 }
}

const mutations = {
 setForms(state: any, forms: Form[]) {
  state.forms = forms
 },
}

export default {
 namespaced: true,
 state,
 getters,
 actions,
 mutations,
}
