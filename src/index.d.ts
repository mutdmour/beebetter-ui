declare namespace beebetter {
 export interface RadioGroupOption {
  label: string
  value: number
 }

 export interface RadioGroup {
  label: string
  options: RadioGroupOption[]
 }

 export interface TextInput {
  label: string
  value: string
 }

 interface FormElement {
  type: string
  name: string
  content: TextInput | RadioGroup | null
 }

 export interface Page {
  name: string
  elements: FormElement[]
 }

 export interface Form {
  slug: string
  name: string
  pages: Page[]
 }

 export interface FormsState {
  forms: Form[]
  currentFormName: string
 }
}

export = beebetter
