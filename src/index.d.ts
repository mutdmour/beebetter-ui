declare namespace beebetter {
 export interface Form {
  id: number
  name: string
 }

 export interface FormsState {
  forms: Form[]
  currentFormName: string
 }

 export interface RadioGroupOption {
  label: string
  value: number
 }
}

export = beebetter
