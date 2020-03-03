/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormsState } from '../../index'
import { getForms, updateForm } from '../../api/forms'
import { ActionContext } from 'vuex'

const state = {
 currentFormSlug: null,
 forms: [],
}

const getters = {
 currentForm: (state: FormsState): Form | null => {
  const matches = state.forms.filter(form => form.slug == state.currentFormSlug)
  return matches.length > 0 ? matches[0] : null
 },
}

const actions = {
 getAllForms: (context: ActionContext<any, unknown>) => {
  getForms((forms: Form[]) => {
   context.commit('setForms', forms)
  })
 },
 updateForm: (context: ActionContext<any, unknown>, form: Form) => {
  return new Promise((resolve, reject) => {
   updateForm(form, (error: string | null) => {
    if (error) {
     return reject(error)
    }
    context.commit('setForm', form)
    resolve()
   })
  })
 },
 continueToNextPage: (
  context: ActionContext<any, unknown>,
  pageIndex: number
 ) => {
  return new Promise((resolve, reject) => {
   const currentForm = getters.currentForm(context.state)
   if (currentForm?.canSubmitPage(pageIndex)) {
    return resolve()
   }
   reject()
  })
 },
 submitForm: (context: ActionContext<any, unknown>) => {
  return new Promise((resolve, reject) => {
   const currentForm = getters.currentForm(context.state)
   if (currentForm?.canSubmit()) {
    return resolve()
   }
   reject()
  })
 },
}

const mutations = {
 setCurrentFormSlug: (state: FormsState, formName: string) => {
  state.currentFormSlug = formName
 },
 setForms(state: FormsState, forms: Form[]) {
  state.forms = forms
 },
 updateElement(
  state: FormsState,
  payload: {
   pageIndex: number
   elementIndex: number
   value: string
  }
 ) {
  const form = getters.currentForm(state)
  if (form) {
   form.setValue(payload.pageIndex, payload.elementIndex, payload.value)
  }
 },
}

export default {
 namespaced: true,
 state,
 getters,
 actions,
 mutations,
}
