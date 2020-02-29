declare namespace beebetter {
 interface RadioGroupOption {
  label: string
  value: number
 }

 interface RadioGroup {
  label: string
  options: RadioGroupOption[]
  value: string
 }

 interface TextInput {
  label: string
  value: string
  expected: string | null
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
 }

 interface FormElement {
  type: string
  enabled: boolean
  required: boolean
  beemind: BeeminderConfig | null
  content: TextInput | RadioGroup | null

  setValue: (value: string) => void
 }

 interface Page {
  name: string
  elements: (FormElement | RandomCollection)[]

  getElement: (index: number) => FormElement | RandomCollection | null
  setValue: (elementIndex: number, value: string) => void
 }

 interface Form {
  slug: string
  name: string
  pages: Page[]

  getPage: (index: number) => Page | null
  setValue: (pageIndex: number, elementIndex: number, value: string) => void
 }

 interface FormsState {
  forms: Form[]
  currentFormSlug: string
 }
}

export = beebetter
