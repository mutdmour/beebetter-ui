import { Form } from '../index'
import FormWrapper from './FormWrapper'

/**
 * Mocking client-server processing
 */
const getMockResponse = () => [
 {
  slug: 'daily',
  name: 'daily',
  pages: [
   {
    name: 'page1',
    elements: [
     {
      type: 'text',
      name: 'myquestion',
      content: {
       label: 'Sup?',
      },
     },
     {
      type: 'radiogroup',
      name: 'selector',
      content: {
       label: 'Pick one:',
       options: [
        {
         label: 'opt1',
         value: 1,
        },
        {
         label: 'opt2',
         value: 0,
        },
       ],
      },
     },
    ],
   },
   {
    name: 'page2',
    elements: [],
   },
  ],
 },
 { slug: 'time', name: 'time', pages: [] },
]

const wrapFormData = (forms: any[]): Form[] => {
  return forms && forms.map(data => new FormWrapper(data))
}

export function getForms(cb: (forms: Form[]) => void) {
 setTimeout(() => cb(wrapFormData(getMockResponse())), 1000)
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
