declare namespace beebetter {
 export interface RadioGroupOption {
  label: string
  value: number
 }

 export interface RadioGroup {
  label: string
  options: RadioGroupOption[]
  value: string
 }

 export interface TextInput {
  label: string
  value: string
 }

 interface FormElement {
  type: string
  name: string
  content: TextInput | RadioGroup | null

  setValue: (value: string) => void
 }

 export interface Page {
  name: string
  elements: FormElement[]

  getElement: (index: number) => FormElement | null
 }

 export interface Form {
  slug: string
  name: string
  pages: Page[]

  getPage: (index: number) => Page | null
 }

 export interface FormsState {
  forms: Form[]
  currentFormName: string
 }
}

export = beebetter
