import { Form } from '../index'

/**
 * Mocking client-server processing
 */
const getMockForms = () => [
 {
  id: 1,
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
   },
  ],
 },
 { id: 2, name: 'time' },
]

export function getForms(cb: (forms: Form[]) => void) {
 setTimeout(() => cb(getMockForms()), 1000)
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
