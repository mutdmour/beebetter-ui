declare namespace beebetter {
 interface RadioGroupOption {
  label: string
  value: string
 }

 interface RadioGroup {
  label: string
  options: RadioGroupOption[]
  value: string
  canSubmit: () => boolean
  setValue: (value: string) => void
 }

 interface TextInput {
  label: string
  value: string
  expected: string | null
  canSubmit: () => boolean
  setValue: (value: string) => void
 }

 interface BeeminderConfig {
  enabled: true
  goalName: string
 }

 interface RandomCollection {
  elements: FormElement[]
  selected: number
  type: string
  setValue: (value: string) => void
  canSubmit: () => boolean
 }

 interface FormElement {
  type: string
  enabled: boolean
  required: boolean
  beemind: BeeminderConfig | null
  content: TextInput | RadioGroup
  invalid: boolean

  setValue: (value: string) => void
  canSubmit: () => boolean
 }

 interface Page {
  name: string
  elements: (FormElement | RandomCollection)[]

  getElement: (index: number) => FormElement | RandomCollection | null
  setValue: (elementIndex: number, value: string) => void
  canSubmit: () => boolean
 }

 interface Form {
  slug: string
  name: string
  pages: Page[]

  getPage: (index: number) => Page | null
  setValue: (pageIndex: number, elementIndex: number, value: string) => void
  canSubmit: () => boolean
  canSubmitPage: (pageIndex: number) => boolean
 }

 interface FormsState {
  forms: Form[]
  currentFormSlug: string
 }
}

export = beebetter
