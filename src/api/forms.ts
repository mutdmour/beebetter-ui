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
       title: 'Sup?',
      },
     },
     {
      type: 'radiogroup',
      name: 'selector',
      content: {
       title: 'Pick one:',
       options: [
        {
         text: 'opt1',
         value: 1,
        },
        {
         text: 'opt2',
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
 setTimeout(() => cb(getMockForms()), 100)
}

export function updateForm(form: Form, cb: (error: string | null) => void) {
 setTimeout(() => {
  if (form.name === 'time') {
   cb('Error calling update')
  } else {
   cb(null)
  }
 }, 100)
}
