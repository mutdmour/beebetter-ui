/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, FormsState, FormJSON } from '../../index'
import { getForms, updateForm } from '../../api/forms'
import { ActionContext } from 'vuex'
import FormWrapper from '@/api/FormWrapper'

const state = {
 currentFormSlug: null,
 forms: [],
}

const notEmpty = <TValue>(
 value: TValue | null | undefined
): value is TValue => {
 return value !== null && value !== undefined
}

const wrapFormData = (data: { forms: [FormJSON] }): Form[] => {
 return (
  data &&
  data.forms &&
  data.forms
   .map(form => {
    try {
     return new FormWrapper(form)
    } catch (e) {
     console.log(e)
    }
   })
   .filter(notEmpty)
 )
}

const getters = {
 currentForm: (state: FormsState): Form | null => {
  const matches = state.forms.filter(form => form.slug == state.currentFormSlug)
  return matches.length > 0 ? matches[0] : null
 },
}

const actions = {
 getAllForms: (context: ActionContext<any, unknown>) => {
  getForms().then((data: any) => {
   context.commit('setForms', wrapFormData(data))
  })
 },
 updateForm: (
  context: ActionContext<any, unknown>,
  data: { formId: number; form: FormJSON }
 ) => {
  return new Promise((resolve, reject) => {
   try {
    const updated = new FormWrapper(data.form)
    updateForm(data.formId, updated.getJSON())
     .then(() => {
      resolve()
     })
     .catch((e) => {
      reject(e)
     })
     .finally(() => {
      context.commit('setForm', updated)
     })
   } catch (e) {
    reject(e)
   }
  })
 },
 continueToNextPage: (
  context: ActionContext<any, unknown>,
  pageIndex: number
 ) => {
  return new Promise((resolve, reject) => {
   const currentForm = getters.currentForm(context.state)
   context.commit('validatePage', pageIndex)
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
  state.forms = forms || []
 },
 setForm(state: FormsState, form: Form) {
  const matches = state.forms.filter(form => form.slug == state.currentFormSlug)
  if (matches.length > 0) {
   matches[0] = form
  }
 },
 validatePage(state: FormsState, pageIndex: number) {
  const form = getters.currentForm(state)
  if (form) {
   form.validatePage(pageIndex)
  }
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
