declare namespace beebetter {
  export interface Form {
   id: number
   name: string
  }

  export interface FormsState {
    forms: Form[]
  }
}

export = beebetter