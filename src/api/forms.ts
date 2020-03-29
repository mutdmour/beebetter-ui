import { Form, FormJSON } from '../index'
import FormWrapper from './FormWrapper'

const GET_ALL_FORMS_ENDPOINT = '/api/v1/forms'

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
     // todo
     // console.log(e);
    }
   })
   .filter(notEmpty)
 )
}

export function getForms(cb: (forms: Form[]) => void) {
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 fetch(GET_ALL_FORMS_ENDPOINT, {
  mode: 'cors',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
 }).then((results: any) => {
  cb(wrapFormData(results))
 })
}

export function updateForm(form: Form, cb: (error: string | null) => void) {
 setTimeout(() => {
  if (form.name === 'time') {
   cb('Error calling update')
  } else {
   cb(null)
  }
 }, 1000)
}
