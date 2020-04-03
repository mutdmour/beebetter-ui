import { FormJSON } from '../index'

const GET_ALL_FORMS_ENDPOINT = '/api/v1/forms'
const UPDATE_FORM_ENDPOINT = '/api/v1/form/update?formId='

export function getForms() {
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 return new Promise((resolve, reject) => {
  fetch(GET_ALL_FORMS_ENDPOINT).then(response => {
   response.ok ? resolve(response.json()) : reject()
  })
 })
}

export function updateForm(formId: number, form: FormJSON) {
 const url = `${UPDATE_FORM_ENDPOINT}${formId}`

 return new Promise((resolve, reject) => {
  fetch(url, {
   method: 'POST',
   body: JSON.stringify(form),
  }).then(async response => {
   const body = await response.text()
   response.ok ? resolve() : reject(body)
  })
 })
}
