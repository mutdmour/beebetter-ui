import { FormJSON } from '../index'

const GET_ALL_FORMS_ENDPOINT = '/api/v1/forms'
const UPDATE_FORM_ENDPOINT = '/api/v1/forms/update?formId='
const DELETE_FORM_ENDPOINT = '/api/v1/forms/delete?formId='
const CREATE_FORM_ENDPOINT = '/api/v1/forms/create?slug='

export function getForms() {
 return new Promise((resolve, reject) => {
  fetch(GET_ALL_FORMS_ENDPOINT).then(response => {
   response.ok ? resolve(response.json()) : reject()
  })
 })
}

export function createForm(slug: string) {
 return new Promise((resolve, reject) => {
  const url = `${CREATE_FORM_ENDPOINT}${slug}`
  fetch(url, {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({ slug }),
  }).then(async response => {
   response.ok ? resolve(await response.json()) : reject(await response.text())
  })
 })
}

export function updateForm(formId: number, form: FormJSON) {
 const url = `${UPDATE_FORM_ENDPOINT}${formId}`

 return new Promise((resolve, reject) => {
  fetch(url, {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify(form),
  }).then(async response => {
   const body = await response.text()
   response.ok ? resolve() : reject(body)
  })
 })
}

export function deleteForm(formId: number) {
 const url = `${DELETE_FORM_ENDPOINT}${formId}`

 return new Promise((resolve, reject) => {
  fetch(url, {
   method: 'POST',
  }).then(async response => {
   const body = await response.text()
   response.ok ? resolve() : reject(body)
  })
 })
}
