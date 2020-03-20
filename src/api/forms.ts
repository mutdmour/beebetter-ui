import { Form, FormJSON } from '../index'
import FormWrapper from './FormWrapper'

/**
 * Mocking client-server processing
 */
const getMockResponse = (): { forms: [FormJSON] } => ({
 forms: [
  {
   id: 1,
   slug: 'daily',
   config: {
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
         expected: null,
        },
        beemind: null,
       },
       {
        type: 'random',
        elements: [
         {
          type: 'text',
          enabled: true,
          required: false,
          beemind: null,
          content: {
           label: 'randA',
           expected: null,
          },
         },
         {
          type: 'text',
          enabled: true,
          beemind: null,
          required: true,
          content: {
           label: 'randB',
           expected: null,
          },
         },
        ],
       },
       {
        type: 'radio',
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
        beemind: null,
        content: {
         label: 'disabled?',
         expected: null,
        },
       },
       {
        type: 'text',
        enabled: true,
        required: false,
        beemind: null,
        content: {
         label: 'expected?',
         expected: 'expected',
        },
       },
      ],
     },
    ],
   },
  },
 ],
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const wrapFormData = (data: {forms: [FormJSON]}): Form[] => {
 return data && data.forms && data.forms.map(form => new FormWrapper(form))
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
