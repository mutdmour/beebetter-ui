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
 }

 interface FormElement {
  type: string
  name: string
  content: TextInput | RadioGroup
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
