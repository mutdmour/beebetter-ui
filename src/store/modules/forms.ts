import { Form, FormsState } from '../../index'
import { getForms, updateForm } from '../../api/forms'
import { ActionContext } from 'vuex'

const state = {
 currentFormName: null,
 forms: [],
}

const getters = {
 currentForm: (state: FormsState): Form | null => {
  const matches = state.forms.filter(form => form.name == state.currentFormName)
  return matches.length > 0 ? matches[0] : null
 },
}

const actions = {
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 getAllForms: (context: ActionContext<any, unknown>) => {
  getForms((forms: Form[]) => {
   context.commit('setForms', forms)
  })
 },
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
}

const mutations = {
 setCurrentFormName: (state: FormsState, formName: string) => {
  state.currentFormName = formName
 },
 setForms(state: FormsState, forms: Form[]) {
  state.forms = forms
 },
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 updateElement(
  state: FormsState,
  payload: { pageIndex: number; elemIndex: number; value: string }
 ) {
  const currentForm = getters.currentForm(state)
  const currentPage = currentForm && currentForm.getPage(payload.pageIndex)
  const currentElement =
   currentPage && currentPage.getElement(payload.elemIndex)
  if (currentElement) {
   currentElement.setValue(payload.value)
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
