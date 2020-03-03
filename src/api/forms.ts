import { Form } from '../index'
import FormWrapper from './FormWrapper'

/**
 * Mocking client-server processing
 */
const getMockResponse = () => [
 {
  slug: 'daily',
  name: 'Daily Form',
  pages: [
   {
    name: 'page1',
    elements: [
     {
      type: 'text',
      enabled: true,
      required: true,
      content: {
       label: 'Sup?',
      },
     },
     {
      type: 'random',
      enabled: true,
      required: false,
      elements: [
       {
        type: 'text',
        enabled: true,
        required: false,
        content: {
         label: 'randA',
        },
       },
       {
        type: 'text',
        enabled: true,
        required: true,
        content: {
         label: 'randB',
        },
       },
      ],
     },
     {
      type: 'radiogroup',
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
         value: '1',
        },
        {
         label: 'opt2',
         value: '0',
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
      enabled: false,
      required: true,
      content: {
       label: 'disabled?',
      },
     },
     {
      type: 'text',
      enabled: true,
      required: false,
      content: {
       label: 'expected?',
       expected: 'expected',
      },
     },
    ],
   },
  ],
 },
 //  { slug: 'time', name: 'time', pages: [] },
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
