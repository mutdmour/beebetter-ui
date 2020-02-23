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
      enabled: true,
      required: true,
      content: {
       label: 'Sup?',
      },
     },
     {
      type: 'radiogroup',
      name: 'selector',
      enabled: true,
      required: true,
      beemind: {
       enabled: true,
       goalName: 'goal',
      },
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
    elements: [
     {
      type: 'text',
      name: 'test',
      enabled: false,
      content: {
       label: 'disabled?',
      },
     },
    ],
   },
  ],
 },
 { slug: 'time', name: 'time', pages: [] },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
