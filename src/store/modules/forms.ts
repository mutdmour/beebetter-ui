import { Form, FormsState } from '../../index'
import { getForms, updateForm } from '../../api/forms'

const state = {
 currentFormName: null,
 forms: [],
}

const getters = {
 currentForm: (state: FormsState) => {
  const matches = state.forms.filter(form => form.name == state.currentFormName)
  return matches.length > 0 ? matches[0] : {}
 },
}

const actions = {
 getAllForms: (context: any) => {
  getForms((forms: Form[]) => {
   context.commit('setForms', forms)
  })
 },
 updateForm: (context: any, form: Form) => {
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
}

const mutations = {
 setForm: (state: FormsState, newForm: Form) => {
  state.forms = state.forms.map((form: Form) => {
   if (form.id == newForm.id) {
    return newForm
   }
   return form
  })
 },
 setCurrentForm: (state: FormsState, formName: string) => {
  state.currentFormName = formName
 },
 setForms(state: FormsState, forms: Form[]) {
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
